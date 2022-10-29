import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtRestAuthGuard } from '@guards';
import { ExampleResourceService } from './example-resource.service';
import { CreateExampleResourceDto } from './dto/create-example-resource.dto';
import { UpdateExampleResourceDto } from './dto/update-example-resource.dto';

@ApiTags('Example-Resource')
@ApiBearerAuth()
@UseGuards(JwtRestAuthGuard)
@Controller('example-resource')
export class ExampleResourceController {
  constructor(
    private readonly exampleResourceService: ExampleResourceService,
  ) {}

  @ApiOperation({
    summary: 'This action create an exampleResource',
  })
  @Post()
  create(@Body() createExampleResourceDto: CreateExampleResourceDto) {
    return this.exampleResourceService.create(createExampleResourceDto);
  }

  @ApiOperation({
    summary: 'This action returns all exampleResource',
  })
  @Get()
  findAll() {
    return this.exampleResourceService.findAll();
  }

  @ApiOperation({
    summary: 'This action return an exampleResource',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exampleResourceService.findOne(+id);
  }

  @ApiOperation({
    summary: 'This action update an exampleResource',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExampleResourceDto: UpdateExampleResourceDto,
  ) {
    return this.exampleResourceService.update(+id, updateExampleResourceDto);
  }

  @ApiOperation({
    summary: 'This action delete an exampleResource',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exampleResourceService.remove(+id);
  }
}
