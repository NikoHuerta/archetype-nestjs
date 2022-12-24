import {
  Controller,
  Post,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { LocalAuthGuard } from './guards';
import { LoginUserRequestDto } from './dto';
import { AuthService } from './auth.service';

@ApiTags('login')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Login user',
  })
  @ApiBody({
    type: LoginUserRequestDto,
  })
  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
