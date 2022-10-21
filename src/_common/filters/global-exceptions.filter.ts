import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AxiosError } from 'axios';
import { QueryFailedError, EntityNotFoundError } from 'typeorm';

import { LoggerService } from '@logger/logger.service';
import { HttpAdapterHost } from '@nestjs/core';

interface ErrorResponse {
  message: string;
  unmaskMessage?: string;
  code: string | number;
}

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private configService: ConfigService<NodeJS.ProcessEnv>,
    private readonly logger: LoggerService,
  ) {}

  catch(
    exception:
      | HttpException
      | AxiosError
      | QueryFailedError
      | EntityNotFoundError
      | unknown,
    host: ArgumentsHost,
  ) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;
    const isAxiosException = exception instanceof AxiosError;
    const isQueryFailedError = exception instanceof QueryFailedError;
    const isEntityNotFoundError = exception instanceof EntityNotFoundError;

    if (exception instanceof TypeError) console.error(exception);

    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const response = isHttpException
      ? (exception.getResponse() as ErrorResponse)
      : isAxiosException
      ? (exception.toJSON() as Record<any, any>)
      : isQueryFailedError
      ? exception
      : {
          message: 'error inesperado',
          unmaskMessage: exception.toString(),
        };

    const error: ErrorResponse = {
      message: response?.message ?? 'error inesperado',
      code: status,
    };

    if (this.configService.get('NODE_ENV') === 'development') {
      error.message = response?.unmaskMessage || error.message;
      error.code = response?.code || status;
    }

    this.logger.error({
      message: response?.unmaskMessage || error.message,
      statusCode: response?.code || status,
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      body: req.body,
      externalRequest: isAxiosException
        ? {
            method: response.config.method,
            url: response.config.url,
            data: response.config.data,
          }
        : undefined,
      sql: isQueryFailedError
        ? {
            query: exception.query,
            message: exception.message,
            parameters: exception.parameters,
          }
        : isEntityNotFoundError
        ? { exception }
        : undefined,
    });

    httpAdapter.reply(ctx.getResponse(), error, status);
  }
}
