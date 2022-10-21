import {
  Module,
  CacheModule,
  ValidationPipe,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { ClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from '@common/logger/logger.module';
import { CoopeuchModule } from '@coopuech/coopeuch.module';
import { RepositoryModule } from '@repository/repository.module';
import { GlobalExceptionsFilter } from '@filters';
import { LoggerInterceptor } from './_common/interceptor';
import { LoggerMiddleware } from './_common/middleware';

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
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<NodeJS.ProcessEnv>) => {
        const typeOrmConfig = {
          type: configService.get<'postgres'>('DB_SOURCE'),
          host: configService.get('DB_HOST_WRITE'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          autoLoadEntities: true,
          keepConnectionAlive: true,
          // TODO: dejarlo en false y generar una migracion inicial | conversar si se deja en sincronizacion
          synchronize: true,
          entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
          logging: process.env.NODE_ENV === 'development',
          replication: {
            master: {
              host: configService.get('DB_HOST_WRITE'),
              port: +configService.get('DB_PORT'),
              username: configService.get('DB_USER'),
              password: configService.get('DB_PASSWORD'),
              database: configService.get('DB_DATABASE'),
            },
            slaves: [
              {
                host: configService.get('DB_HOST_READ'),
                port: +configService.get('DB_PORT'),
                username: configService.get('DB_USER'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
              },
            ],
          },
        };

        return typeOrmConfig;
      },
      inject: [ConfigService],
    }),
    LoggerModule,
    CoopeuchModule,
    RepositoryModule,
    AuthModule,
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
