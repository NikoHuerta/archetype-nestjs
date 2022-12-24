import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  CACHE_MANAGER,
  UseInterceptors,
  CacheKey,
  CacheInterceptor,
  CacheTTL,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { UpdateUserRequestDto } from './dto/update-user.request.dto';
import { ApiBody, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtRestAuthGuard } from '../_common/guards/jwt-auth.guard';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtRestAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(CACHE_MANAGER) private cacheManager: any,
  ) {}

  @ApiOperation({
    summary: 'Create a new user',
  })
  @ApiBody({
    type: CreateUserRequestDto,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserRequestDto) {
    return await this.usersService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Get all users',
    description: 'This request use 1 hour cache',
  })
  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('users')
  // @CacheTTL(60 * 60 * 1) // 60 seconds * 60 minutes * 1 hour
  @CacheTTL(30)
  async findAll() {
    return await this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Get user by id',
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.usersService.findById(id);
  }

  @ApiOperation({
    summary: 'Update user',
  })
  @ApiBody({
    type: UpdateUserRequestDto,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserRequestDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Delete user',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
