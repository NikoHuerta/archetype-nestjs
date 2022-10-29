import { Injectable } from '@nestjs/common';

import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '@entities';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id).lean();
  }

  async findOne(user: Partial<User>): Promise<User> {
    return await this.userModel.findOne(user).lean();
  }

  async find(user: Partial<User>): Promise<User[]> {
    return await this.userModel.find(user).lean();
  }

  async create(user: Partial<User>): Promise<User> {
    return this.userModel.create(user);
  }

  async save(id: string, payload: Partial<User>): Promise<User[]> {
    return await this.userModel.findByIdAndUpdate(id, payload, { new: true });
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndUpdate(
      id,
      { active: false },
      { new: true },
    );
  }
}
