import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

import { User } from '@entities';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  /**
   * Find one user by criterial
   * @param criteria
   */
  async findOne(criteria: FindOneOptions<User>): Promise<User> {
    return this.userRepo.findOne(criteria);
  }

  /**
   * Save user by criterial
   * @param criteria
   */
  async save(payload: Partial<User>): Promise<User> {
    return this.userRepo.save(payload);
  }
}
