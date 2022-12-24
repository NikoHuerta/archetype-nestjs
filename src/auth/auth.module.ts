import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '@src/users/users.module';
import { LocalStrategy, JwtStrategy, JwtTwoFactorStrategy } from './strategy';
import { AuthService } from './auth.service';
import { TwoFactorAuthService } from './two-factor-auth.service';

import { AuthController } from './auth.controller';
import { TwoFactorAuthController } from './two-factor-auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: '600s' },
      }),
    }),
  ],
  providers: [
    AuthService,
    TwoFactorAuthService,
    LocalStrategy,
    JwtStrategy,
    JwtTwoFactorStrategy,
  ],
  controllers: [AuthController, TwoFactorAuthController],
  exports: [PassportModule, JwtStrategy, JwtTwoFactorStrategy],
})
export class AuthModule {}
