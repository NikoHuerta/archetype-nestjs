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
import { JwtTwoFactorRestAuthGuard } from '../_common/guards/jwt-two-factor-auth.guard';

@ApiTags('Example-Resource')
@Controller('example-resource')
export class ExampleResourceController {
  constructor(
    private readonly exampleResourceService: ExampleResourceService,
  ) {}

  @ApiOperation({
    summary: 'This action create an exampleResource',
    description: 'This method use a normal Login token',
  })
  @ApiBearerAuth()
  @UseGuards(JwtRestAuthGuard)
  @Post()
  async create(@Body() createExampleResourceDto: CreateExampleResourceDto) {
    return await this.exampleResourceService.create(createExampleResourceDto);
  }

  @ApiOperation({
    summary: 'This action returns all exampleResource',
    description: 'This method use a 2FA Login token',
  })
  @ApiBearerAuth()
  @UseGuards(JwtTwoFactorRestAuthGuard)
  @Get()
  async findAll() {
    return await this.exampleResourceService.findAll();
  }

  @ApiOperation({
    summary: 'This action return an exampleResource',
    description: 'This method use a normal Login token',
  })
  @ApiBearerAuth()
  @UseGuards(JwtRestAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.exampleResourceService.findOne(+id);
  }

  @ApiOperation({
    summary: 'This action update an exampleResource',
    description: 'This method use a 2FA Login token',
  })
  @ApiBearerAuth()
  @UseGuards(JwtTwoFactorRestAuthGuard)
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
    description: 'This method use no token',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.exampleResourceService.remove(+id);
  }
}
