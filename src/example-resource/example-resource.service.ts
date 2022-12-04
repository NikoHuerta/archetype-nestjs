import { Injectable } from '@nestjs/common';
import { CreateExampleResourceDto } from './dto/create-example-resource.dto';
import { UpdateExampleResourceDto } from './dto/update-example-resource.dto';
import { RsDiscordWebhookService } from '@common/discord/rs-discord-webhook.service';

@Injectable()
export class ExampleResourceService {
  constructor(
    private readonly rsDiscordWebhookService: RsDiscordWebhookService,
  ) {}

  async create(createExampleResourceDto: CreateExampleResourceDto) {
    return 'This action adds a new exampleResource';
  }

  async findAll() {
    return `This action returns all exampleResource`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} exampleResource`;
  }

  async update(id: number, updateExampleResourceDto: UpdateExampleResourceDto) {
    return `This action updates a #${id} exampleResource`;
  }

  async remove(id: number) {
    return `This action removes a #${id} exampleResource`;
  }
}
