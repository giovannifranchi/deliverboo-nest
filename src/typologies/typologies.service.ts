import { Injectable } from '@nestjs/common';
import { CreateTypologyDto } from './dto/create-typology.dto';
import { UpdateTypologyDto } from './dto/update-typology.dto';

@Injectable()
export class TypologiesService {
  create(createTypologyDto: CreateTypologyDto) {
    return 'This action adds a new typology';
  }

  findAll() {
    return `This action returns all typologies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typology`;
  }

  update(id: number, updateTypologyDto: UpdateTypologyDto) {
    return `This action updates a #${id} typology`;
  }

  remove(id: number) {
    return `This action removes a #${id} typology`;
  }
}
