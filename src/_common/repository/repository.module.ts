import { Global, Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { User } from '@entities';
import { UserRepository } from './user.repository';

@Global()
@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: User,
        schemaOptions: { collection: 'users', timestamps: true },
      },
    ]),
  ],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class RepositoryModule {}
