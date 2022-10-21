import { Body, Controller, Post, UseGuards, Headers } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { PostGetTokenRequestDto, PostGetTokenResponseDto } from '@auth/dto';
import { CaptchaGuard, TokenGuard } from '@guards';
import { ChannelDecorator, Token } from '@decorators';
import { ChannelEnum } from '@enums';
import { AccessToken } from '@interfaces';
import { GlobalErrorDto, AccessTokenDto } from '@dtos';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('get-token')
  @ApiCreatedResponse({ type: PostGetTokenResponseDto })
  @ApiForbiddenResponse({ type: GlobalErrorDto })
  @UseGuards(CaptchaGuard)
  async post(
    @Body() getTokenRequestDto: PostGetTokenRequestDto,
    @Headers() headers,
    @ChannelDecorator() channel: ChannelEnum,
  ) {
    return this.authService.getToken(getTokenRequestDto, headers, channel);
  }

  @Post('validate')
  @UseGuards(TokenGuard)
  @ApiHeader({
    name: 'authorization',
    description: 'Token de acceso',
  })
  @ApiForbiddenResponse({ type: GlobalErrorDto })
  @ApiCreatedResponse({ type: AccessTokenDto })
  async validate(@Token() token: AccessToken) {
    return token;
  }

  @Post('refresh-token')
  @UseGuards(TokenGuard)
  @ApiHeader({
    name: 'authorization',
    description: 'Token de acceso',
  })
  @ApiForbiddenResponse({ type: GlobalErrorDto })
  @ApiCreatedResponse({ type: PostGetTokenResponseDto })
  async refreshToken(@Token() token: AccessToken) {
    return this.authService.refreshToken(token);
  }

  @Post('abort-token')
  @UseGuards(TokenGuard)
  @ApiHeader({
    name: 'authorization',
    description: 'Token de acceso',
  })
  @ApiForbiddenResponse({ type: GlobalErrorDto })
  @ApiCreatedResponse({ type: Boolean })
  async abort(@Token() token: AccessToken) {
    return this.authService.abortToken(token);
  }
}
