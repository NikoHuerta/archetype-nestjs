import { PartialType } from '@nestjs/swagger';
import { CreateExampleResourceDto } from './create-example-resource.dto';

export class UpdateExampleResourceDto extends PartialType(
  CreateExampleResourceDto,
) {}
