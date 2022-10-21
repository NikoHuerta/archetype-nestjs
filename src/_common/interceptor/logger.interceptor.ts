import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const { originalUrl, method } = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        this.logger.log(
          `${method} ${originalUrl}|Res-Code:${statusCode}|Res-Body: ${JSON.stringify(
            data,
          )}`,
          'Response',
        );
        return data;
      }),
    );
  }
}
