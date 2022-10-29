import { Module } from '@nestjs/common';
import { ExampleResourceService } from './example-resource.service';
import { ExampleResourceController } from './example-resource.controller';

@Module({
  controllers: [ExampleResourceController],
  providers: [ExampleResourceService],
})
export class ExampleResourceModule {}
