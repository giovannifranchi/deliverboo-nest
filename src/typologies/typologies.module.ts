import { Module } from '@nestjs/common';
import { TypologiesService } from './typologies.service';
import { TypologiesController } from './typologies.controller';

@Module({
  controllers: [TypologiesController],
  providers: [TypologiesService],
})
export class TypologiesModule {}
