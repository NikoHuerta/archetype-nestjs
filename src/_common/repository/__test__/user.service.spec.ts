import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../user.service';

describe('UserService', () => {
  let service: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    service = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
