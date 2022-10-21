import { Test, TestingModule } from '@nestjs/testing';
import { AuthServiceFuseService } from '../fuse.service';

describe('FuseService', () => {
  let service: AuthServiceFuseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthServiceFuseService],
    }).compile();

    service = module.get<AuthServiceFuseService>(AuthServiceFuseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
