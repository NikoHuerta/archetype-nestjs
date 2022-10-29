import { Injectable } from '@nestjs/common';
import { CreateExampleResourceDto } from './dto/create-example-resource.dto';
import { UpdateExampleResourceDto } from './dto/update-example-resource.dto';

@Injectable()
export class ExampleResourceService {
  create(createExampleResourceDto: CreateExampleResourceDto) {
    return 'This action adds a new exampleResource';
  }

  findAll() {
    return `This action returns all exampleResource`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exampleResource`;
  }

  update(id: number, updateExampleResourceDto: UpdateExampleResourceDto) {
    return `This action updates a #${id} exampleResource`;
  }

  remove(id: number) {
    return `This action removes a #${id} exampleResource`;
  }
}
