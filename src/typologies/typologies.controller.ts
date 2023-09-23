import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypologiesService } from './typologies.service';
import { CreateTypologyDto } from './dto/create-typology.dto';
import { UpdateTypologyDto } from './dto/update-typology.dto';

@Controller('typologies')
export class TypologiesController {
  constructor(private readonly typologiesService: TypologiesService) {}

  @Post()
  create(@Body() createTypologyDto: CreateTypologyDto) {
    return this.typologiesService.create(createTypologyDto);
  }

  @Get()
  findAll() {
    return this.typologiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typologiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypologyDto: UpdateTypologyDto) {
    return this.typologiesService.update(+id, updateTypologyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typologiesService.remove(+id);
  }
}
