import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Event, Token, User } from '@entities';
import { UserRepository } from './user.repository';
import { TokenRepository } from '@repository/token.repository';
import { EventRepository } from '@repository/event.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Event, Token, User])],
  providers: [UserRepository, TokenRepository, EventRepository],
  exports: [UserRepository, TokenRepository, EventRepository],
})
export class RepositoryModule {}
