import { Test, TestingModule } from '@nestjs/testing';
import { ServerMessageService } from './server-message.service';

describe('ServerMessageService', () => {
  let service: ServerMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServerMessageService],
    }).compile();

    service = module.get<ServerMessageService>(ServerMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
