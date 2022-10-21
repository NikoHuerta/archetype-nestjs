import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { PostGetTokenRequestDto, PostGetTokenResponseDto } from '@auth/dto';
import { ChannelEnum } from '@enums';

describe('TokenController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getToken', () => {
    it('should return a common accessToken ', async () => {
      const body: PostGetTokenRequestDto = {
        rut: '123456',
        password: '123456',
      };
      const result: Promise<PostGetTokenResponseDto> = Promise.resolve({
        accessToken: '123456',
      });

      jest.spyOn(service, 'getToken').mockImplementation(() => result);

      expect(await controller.post(body, {}, ChannelEnum.Web)).toBe(result);
    });
  });
});
