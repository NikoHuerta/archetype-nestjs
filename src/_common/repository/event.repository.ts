import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Event } from '@entities';

@Injectable()
export class EventRepository {
  constructor(@InjectRepository(Event) private eventRepo: Repository<Event>) {}

  /**
   * Save event by criterial
   * @param {Partial<Event>} criteria
   */
  async save(payload: Partial<Event>): Promise<Event> {
    return this.eventRepo.save(payload);
  }
}
