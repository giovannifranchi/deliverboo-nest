import { Injectable } from '@nestjs/common';
import { CreateTypologyDto } from './dto/create-typology.dto';
import { UpdateTypologyDto } from './dto/update-typology.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TypologiesService {
  constructor(private prisma: PrismaService){}

  //route for superAdmin
  create(createTypologyDto: CreateTypologyDto) {
    return 'This action adds a new typology';
  }

  findAll() {
    return this.prisma.typologies.findMany();
  }

  findAllWithRestaurants(){
    return this.prisma.typologies.findMany({
      where: {
        restaurant_typology: {
          some: {}
        }
      }
    })
  }

  findOne(id: number) {
    return this.prisma.typologies.findFirst({
      where: {
        id: id
      }
    });
  }

  update(id: number, updateTypologyDto: UpdateTypologyDto) {
    return `This action updates a #${id} typology`;
  }

  remove(id: number) {
    return `This action removes a #${id} typology`;
  }
}
