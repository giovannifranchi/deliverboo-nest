import { Module } from '@nestjs/common';
import { TypologiesService } from './typologies.service';
import { TypologiesController } from './typologies.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TypologiesController],
  providers: [TypologiesService, PrismaService],
})
export class TypologiesModule {}
