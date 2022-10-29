import {
  Module,
  CacheModule,
  ValidationPipe,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

import type { ClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { TypegooseModule } from 'nestjs-typegoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RepositoryModule } from '@repository/repository.module';
import { LoggerModule } from '@common/logger/logger.module';
import { UsersModule } from './users/users.module';
import { GlobalExceptionsFilter } from '@filters';
import { LoggerInterceptor } from './_common/interceptor';
import { LoggerMiddleware } from './_common/middleware';
import { ExampleResourceModule } from './example-resource/example-resource.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    CacheModule.registerAsync<ClientOpts>({
      useFactory: (configService: ConfigService<NodeJS.ProcessEnv>) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        password:
          process.env.NODE_ENV === 'development'
            ? configService.get('REDIS_PASSWORD')
            : undefined,
        ttl: 780,
      }),
      isGlobal: true,
      inject: [ConfigService],
    }),
    TypegooseModule.forRootAsync({
      useFactory: (configService: ConfigService<NodeJS.ProcessEnv>) => {
        const config = {
          uri: configService.get<string>('DB_SOURCE'),
          useNewUrlParser: true,
        };
        return config;
      },
      inject: [ConfigService],
    }),
    LoggerModule,
    RepositoryModule,
    UsersModule,
    AuthModule,
    ExampleResourceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
