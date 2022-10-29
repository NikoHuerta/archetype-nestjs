import { CacheStore, CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';

import { UserRepository } from '@repository/user.repository';
import { User } from '@entities';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { UpdateUserRequestDto } from './dto/update-user.request.dto';
import { hashPassword } from '@helpers';

@Injectable()
export class UsersService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: CacheStore,
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserRequestDto) {
    createUserDto.email = createUserDto.email.toLocaleLowerCase();
    createUserDto.password = await hashPassword(createUserDto.password);
    return await this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({});
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserRequestDto) {
    let user = await this.findById(id);
    const {
      active = undefined,
      source = undefined,
      role = undefined,
      rut = undefined,
      ...updateRest
    } = updateUserDto;

    if (updateRest.password) {
      updateRest.password = await hashPassword(updateRest.password);
    }

    user = { ...user, ...updateRest };
    console.log(user);
    return await this.userRepository.save(id, user);
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      email: email.toLocaleLowerCase(),
    });
  }
}
