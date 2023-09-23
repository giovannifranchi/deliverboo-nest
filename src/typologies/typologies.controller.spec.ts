import { Test, TestingModule } from '@nestjs/testing';
import { TypologiesController } from './typologies.controller';
import { TypologiesService } from './typologies.service';

describe('TypologiesController', () => {
  let controller: TypologiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypologiesController],
      providers: [TypologiesService],
    }).compile();

    controller = module.get<TypologiesController>(TypologiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
