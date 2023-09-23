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
      },
      include: {
        users: {
          select: {
            name: true,
            email: true
          }
        },
        restaurant_typology: {
          select: {
            typologies: true
          },
        },
        products: true
      }
    });

    if(!restaurant) throw new NotFoundException({ message: `Restaurant with ID ${id} not found` });
    
    //USE THIS PATH TO FLATTEN MANY TO MANY RELASHIONSHIPS INTO AN ARRAY OF JOINED OBJECTS AND OVERWRITE ITS PROPERTY
    const flatTypologies = restaurant.restaurant_typology.map(rt => rt.typologies);

    return {
      ...restaurant, 
      restaurant_typology: flatTypologies
    };
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
