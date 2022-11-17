import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { RsExampleService } from './rs-example.service';
import { RsExample2Service } from './rs-example2.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [RsExampleService, RsExample2Service],
  exports: [RsExampleService, RsExample2Service],
})
export class ApiModule {}
