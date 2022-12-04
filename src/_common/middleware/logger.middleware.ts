import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { noLogEndpoints } from '../constants';
import { RsDiscordWebhookService } from '@common/discord/rs-discord-webhook.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly logger: LoggerService,
    private readonly rsDiscordWebhookService: RsDiscordWebhookService,
  ) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const startAt = process.hrtime();
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    let bodyStr = undefined;
    if (Object.keys(request.body).length !== 0) {
      bodyStr = JSON.stringify(request.body);
    }

    const dateTime = new Date(Date.now()).toLocaleDateString('es-CL', {
      weekday: 'short',
      month: '2-digit',
      year: '2-digit',
      day: 'numeric',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    if (!noLogEndpoints.includes(originalUrl)) {
      this.logger.log(
        `${method} ${originalUrl}|FromIp:${ip}${
          !bodyStr ? '' : '|Req-Body: ' + bodyStr
        } |Req-UserAgent:${userAgent}`,
        'Request',
      );
      this.rsDiscordWebhookService.ExecuteWebhook(
        `[${dateTime}] [LOG] [Request] ${method} ${originalUrl}|FromIp:${ip}${
          !bodyStr ? '' : '|Req-Body: ' + bodyStr
        } |Req-UserAgent:${userAgent}`,
      );
    }

    next();
  }
}
