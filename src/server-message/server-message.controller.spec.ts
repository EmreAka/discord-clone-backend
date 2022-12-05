import { Test, TestingModule } from '@nestjs/testing';
import { ServerMessageController } from './server-message.controller';

describe('ServerMessageController', () => {
  let controller: ServerMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServerMessageController],
    }).compile();

    controller = module.get<ServerMessageController>(ServerMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
