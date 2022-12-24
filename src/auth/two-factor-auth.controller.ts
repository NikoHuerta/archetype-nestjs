import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';
import { JwtRestAuthGuard } from '@guards';
import { GetUser } from '@decorators';
import { TwoFaAuthDto } from './dto/two-fa-auth.request.dto';
import { TwoFactorAuthService } from './two-factor-auth.service';

@ApiTags('Two Factor Authentication')
@Controller('2fa')
export class TwoFactorAuthController {
  constructor(private readonly twoFactorAuthService: TwoFactorAuthService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Generate QR code to register Two Factor in Authenticator APP',
  })
  @UseGuards(JwtRestAuthGuard)
  @Post('generate-qr')
  async generateQrCode(@Res() res: Response, @GetUser() user: any) {
    const { otpAuthUrl } =
      await this.twoFactorAuthService.generateTwoFactorAuthSecret(user);
    res.setHeader('content-type', 'image/png');
    return this.twoFactorAuthService.qrCodeStreamPipe(res, otpAuthUrl);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Activate Two Factor Authentication',
  })
  @ApiBody({
    type: TwoFaAuthDto,
  })
  @UseGuards(JwtRestAuthGuard)
  @Post('turn-on-qr')
  async activationOfTwoFa(
    @GetUser() user: any,
    @Body() twoFaAuthDto: TwoFaAuthDto,
  ) {
    const isCodeValid = await this.twoFactorAuthService.verifyTwoFaCode(
      twoFaAuthDto.code,
      user,
    );
    if (!isCodeValid)
      throw new UnauthorizedException('Invalid authentication code');

    await this.twoFactorAuthService.activationOfTwoFactorAuth(user.userId);

    return {
      ok: true,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Login With Two Factor Authentication',
  })
  @ApiBody({
    type: TwoFaAuthDto,
  })
  @Post('authenticate')
  @UseGuards(JwtRestAuthGuard)
  async authenticate(@GetUser() user: any, @Body() twoFaAuthDto: TwoFaAuthDto) {
    const isCodeValid = await this.twoFactorAuthService.verifyTwoFaCode(
      twoFaAuthDto.code,
      user,
    );
    if (!isCodeValid) {
      throw new UnauthorizedException('Invalid authentication code');
    }
    return await this.twoFactorAuthService.login(user, true);
  }
}
