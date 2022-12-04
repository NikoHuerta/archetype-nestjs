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
  async create(@Body() createExampleResourceDto: CreateExampleResourceDto) {
    return await this.exampleResourceService.create(createExampleResourceDto);
  }

  @ApiOperation({
    summary: 'This action returns all exampleResource',
  })
  @Get()
  async findAll() {
    return await this.exampleResourceService.findAll();
  }

  @ApiOperation({
    summary: 'This action return an exampleResource',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.exampleResourceService.findOne(+id);
  }

  @ApiOperation({
    summary: 'This action update an exampleResource',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExampleResourceDto: UpdateExampleResourceDto,
  ) {
    return await this.exampleResourceService.update(
      +id,
      updateExampleResourceDto,
    );
  }

  @ApiOperation({
    summary: 'This action delete an exampleResource',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.exampleResourceService.remove(+id);
  }
}
