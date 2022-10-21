import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { RsAuthService } from './rs-auth.service';
import { RsPersonService } from './rs-person.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [RsAuthService, RsPersonService],
  exports: [RsAuthService, RsPersonService],
})
export class CoopeuchModule {}
