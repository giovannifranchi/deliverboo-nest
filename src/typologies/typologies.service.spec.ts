import { Test, TestingModule } from '@nestjs/testing';
import { TypologiesService } from './typologies.service';

describe('TypologiesService', () => {
  let service: TypologiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypologiesService],
    }).compile();

    service = module.get<TypologiesService>(TypologiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
