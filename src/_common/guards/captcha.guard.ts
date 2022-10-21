import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CaptchaGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService<NodeJS.ProcessEnv>,
    private readonly httpService: HttpService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const token = req.header('x-captcha');

    if (this.configService.get<string>('NODE_ENV') === 'development') {
      return true;
    }

    if (!token) {
      throw new BadRequestException({
        message: 'missingToken',
      });
    }

    try {
      await this.httpService.axiosRef.post(
        `${this.configService.get<string>(
          'GG_CAPTCHA_URL',
        )}?secret=${this.configService.get<string>(
          'GG_CAPTCHA_KEY',
        )}&response=${token}`,
      );
    } catch (error) {
      throw new ForbiddenException({
        message: 'tokenExpire',
      });
      return false;
    }

    return true;
  }
}
