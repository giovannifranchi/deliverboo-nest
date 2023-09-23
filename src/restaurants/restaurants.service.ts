import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Prisma, restaurants } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService){}
  create(createRestaurantDto: CreateRestaurantDto) {
    return 'This action adds a new restaurant';
  }

  async allRestaurant() {
    return this.prisma.restaurants.findMany();
  }

  async findOne(id: number) {
    const restaurant = await this.prisma.restaurants.findUnique({
      where: {
        id: id
      }
    });

    if(!restaurant) throw new NotFoundException({ message: `Restaurant with ID ${id} not found` });

    return restaurant;
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
