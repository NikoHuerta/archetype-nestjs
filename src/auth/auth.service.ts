import {
  CACHE_MANAGER,
  CacheStore,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { plainToClass } from 'class-transformer';

import { PostGetTokenRequestDto, PostGetTokenResponseDto } from '@auth/dto';
import { capitalizeName, sanitizeIdCardComponent } from '@helpers';
import { RsAuthService } from '@coopuech/rs-auth.service';
import { UserRepository } from '@repository/user.repository';
import {
  CacheKeyEnum,
  ChannelEnum,
  EventTypeEnum,
  RoleEnum,
  ValidaUserResponseCodes,
} from '@enums';
import { Token, User } from '@entities';
import { AccessToken } from '@interfaces';
import { TokenRepository } from '@repository/token.repository';
import { EventRepository } from '@repository/event.repository';
import { RsPersonService } from '@coopuech/rs-person.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: CacheStore,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<NodeJS.ProcessEnv>,
    private readonly rsAuthService: RsAuthService,
    private readonly rsPersonService: RsPersonService,
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly eventRepository: EventRepository,
  ) {}

  /**
   * Obtener token
   * @param {PostGetTokenRequestDto} postGetTokenRequestDto
   * @param headers
   * @param {ChannelEnum} channel
   */
  async getToken(
    postGetTokenRequestDto: PostGetTokenRequestDto,
    headers: Record<any, any>,
    channel: ChannelEnum,
  ) {
    const [formatRut, dv] = sanitizeIdCardComponent(
      postGetTokenRequestDto.rut,
      'split',
    );

    // Validar usuario en RsServicioAutenticación
    const {
      validaUserResponse: {
        salida: { codigo, descripcion },
      },
    } = await this.rsAuthService.validateUser({
      Rut: formatRut,
      Clave: postGetTokenRequestDto.password,
      DV: dv,
      operacion: 'LOGIN_DALE',
      canal: 'SIT',
    });

    // Buscar usuario
    let user = await this.userRepository.findOne({
      select: ['id', 'rut'],
      where: { rut: postGetTokenRequestDto.rut },
    });

    if (codigo !== ValidaUserResponseCodes.Success) {
      if (codigo === ValidaUserResponseCodes.UserDoesNotExistInSS) {
        const coopeuchUser = await this.rsPersonService.getBasicData({
          rut: postGetTokenRequestDto.rut,
          codigoCliente: '0',
          userId: 'SRVMBK',
        });

        // Si existe en ibs y no en Dale, es un usuario no migrado
        if (coopeuchUser && !user) {
          // Se genera el evento de login fallido
          await this.eventRepository.save({
            channel,
            requestHeaderUserAgent: headers['user-agent'],
            originIp: headers.host,
            eventType: EventTypeEnum.NotMigrated,
          });
          const accessToken = this.createAccessTokenFromUser(
            { rut: coopeuchUser.rut, role: RoleEnum.client },
            channel,
          );

          return {
            accessToken,
            name: capitalizeName(coopeuchUser.primerNombre),
          };
        }
      }

      // Se genera el evento de login fallido
      await this.eventRepository.save({
        channel,
        requestHeaderUserAgent: headers['user-agent'],
        originIp: headers.host,
        eventType: EventTypeEnum.LoginFailed,
      });

      throw new ForbiddenException({
        message: 'Rut o contraseña invalido',
        unmaskMessage: descripcion,
        code: codigo,
      });
    }

    // Sino existe se crea
    if (!user) {
      user = await this.userRepository.save({
        rut: postGetTokenRequestDto.rut,
        role: RoleEnum.client,
      });
    }

    // Obtener token del cache
    const cacheToken = await this.cacheManager.get<Partial<Token>>(
      `${postGetTokenRequestDto.rut}-${channel}-${CacheKeyEnum.userToken}`,
    );

    let dbToken;

    if (cacheToken && cacheToken.channel === channel) {
      dbToken = cacheToken;
    } else {
      // Se busca un token asociado al usuario y canal
      dbToken = await this.tokenRepository.findOne({
        select: ['token', 'channel', 'id'],
        where: { channel, userId: user.id },
      });
    }

    let accessToken: string;
    let tokenPayload: Partial<Token>;

    // Si existe el token se verifica
    if (dbToken) {
      try {
        this.jwtService.verify(dbToken.token);
        accessToken = dbToken.token;
      } catch (e) {
        // Se genera un token nuevo si está expirado
        accessToken = this.createAccessTokenFromUser(user, channel);
        tokenPayload = {
          token: accessToken,
          channel,
          id: dbToken.id,
        };
      }
    } else {
      // Se genera un nuevo token en caso de que no exista
      accessToken = this.createAccessTokenFromUser(user, channel);
      tokenPayload = {
        token: accessToken,
        channel,
      };
    }

    // Se guarda token en cache
    await this.cacheManager.set<Partial<Token>>(
      `${postGetTokenRequestDto.rut}-${channel}-${CacheKeyEnum.userToken}`,
      {
        token: accessToken,
        channel: dbToken.channel,
        id: dbToken.id,
      },
      // Cache expira en 20 minutos
      { ttl: 1200 },
    );

    // Se guarda o actualiza el token
    if (tokenPayload) {
      dbToken = await this.tokenRepository.save({
        ...tokenPayload,
        algorithm: this.configService.get<string>('JWT_ALGORITHM'),
        userId: user.id,
      });
    }

    // Se genera el evento de login exitoso
    await this.eventRepository.save({
      tokenId: dbToken.id,
      userId: user.id,
      requestHeaderUserAgent: headers['user-agent'],
      originIp: headers.host,
      eventType: EventTypeEnum.LoginSuccess,
      channel,
    });

    const returnValue = {
      accessToken,
    };

    return plainToClass(PostGetTokenResponseDto, returnValue, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Crear jwt token
   * @param {User} user
   * @param channel
   * @private
   */
  private createAccessTokenFromUser(user: Partial<User>, channel: ChannelEnum) {
    const payload: AccessToken = {
      channel,
      sub: user.rut,
      role: user.role as RoleEnum,
      iss: 'Coopeuch',
    };

    const token = this.jwtService.sign(payload);

    return token;
  }

  /**
   * Refresh Token
   * @private
   */
  async refreshToken(token: AccessToken) {
    // Obtener token del cache
    const cacheToken = await this.cacheManager.get<Partial<Token>>(
      `${token.sub}-${token.channel}-${CacheKeyEnum.userToken}`,
    );
    let dbToken;

    if (cacheToken) {
      dbToken = cacheToken;
    } else {
      dbToken = this.tokenRepository.findOne({
        where: { token: token.hash, channel: token.channel },
      });
    }

    if (dbToken) {
      const accessToken = this.createAccessTokenFromUser(
        { rut: token.sub, role: token.role },
        token.channel,
      );

      await this.tokenRepository.save({
        id: dbToken.id,
        token: accessToken,
      });

      return plainToClass(
        PostGetTokenResponseDto,
        { accessToken },
        {
          excludeExtraneousValues: true,
        },
      );
    }
  }

  /**
   * Abort Token
   * @private
   */
  async abortToken(token: AccessToken) {
    // Obtener token del cache
    const cacheToken = await this.cacheManager.get<Partial<Token>>(
      `${token.sub}-${token.channel}-${CacheKeyEnum.userToken}`,
    );
    let dbToken;

    if (cacheToken) {
      dbToken = cacheToken;
    } else {
      dbToken = this.tokenRepository.findOne({
        where: { token: token.hash, channel: token.channel },
      });
    }

    if (dbToken) {
      await this.tokenRepository.save({
        id: dbToken.id,
        token: '',
      });

      return true;
    }

    return new ForbiddenException({ message: 'invalid-token' });
  }
}
