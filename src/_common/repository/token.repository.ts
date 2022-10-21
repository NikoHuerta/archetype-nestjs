import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

import { Token } from '@entities';

@Injectable()
export class TokenRepository {
  constructor(@InjectRepository(Token) private tokenRepo: Repository<Token>) {}

  /**
   * Find one token by criterial
   * @param criterial
   */
  async findOne(criterial: FindOneOptions<Token>): Promise<Token> {
    return this.tokenRepo.findOne(criterial);
  }

  /**
   * Save token by criterial
   * @param {Partial<Token>} criteria
   */
  async save(payload: Partial<Token>): Promise<Token> {
    return this.tokenRepo.save(payload);
  }
}
