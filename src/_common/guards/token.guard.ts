import {
  CACHE_MANAGER,
  CacheStore,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@repository/user.repository';

import { AccessToken } from '@interfaces';
import { TokenRepository } from '@repository/token.repository';
import { CacheKeyEnum } from '@enums';
import { Token } from '@entities';

@Injectable()
export class TokenGuard extends AuthGuard('jwt') {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: CacheStore,
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const authorization = req.header('authorization');

    if (authorization) {
      const token = authorization.split(' ')[1];

      let decodedToken: AccessToken;
      let dbToken: Partial<Token>;

      try {
        decodedToken = this.jwtService.verify(token) as AccessToken;

        // Obtener token del cache
        const cacheToken = await this.cacheManager.get<Partial<Token>>(
          `${decodedToken.sub}-${decodedToken.channel}-${CacheKeyEnum.userToken}`,
        );

        if (
          cacheToken?.token === token &&
          cacheToken?.channel === decodedToken.channel
        ) {
          dbToken = cacheToken;
        } else {
          // Se busca un token asociado al usuario y canal
          dbToken = await this.tokenRepository.findOne({
            select: ['token', 'channel', 'id'],
            where: { token, channel: decodedToken.channel },
          });
        }

        if (dbToken) {
          req.token = {
            ...decodedToken,
            hash: token,
          };
          return true;
        }
      } catch (error) {
        const findToken = await this.tokenRepository.findOne({
          where: { token },
        });

        if (findToken) {
          // Vaciar token de la db
          await this.tokenRepository.save({
            id: findToken.id,
            token: '',
          });
        }
      }

      throw new ForbiddenException({
        message: 'token-expire',
      });
    }
  }
}
