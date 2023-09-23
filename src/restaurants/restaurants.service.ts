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

  async allFilteredRestaurant(typologies: number[]){
    const restaurants = await  this.prisma.restaurants.findMany({
      where: {
        restaurant_typology: {
          some: {
            typology_id: {
              in: typologies
            }
          }
        }
      }, 
      include: {
        restaurant_typology:{
          include: {
            typologies: true
          }
        }
      }
    })

    if(!restaurants) throw new NotFoundException({message: 'no restaurants with this type'});

    const flattedRestaurants = restaurants.map((restaurant) => {
      return { ... restaurant, restaurant_typology: restaurant.restaurant_typology.map(rt => rt.typologies) };
    })

    return flattedRestaurants;
  }

  async findOne(slug: string) {
    const restaurant = await this.prisma.restaurants.findFirst({
      where: {
        slug: slug
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

    if(!restaurant) throw new NotFoundException({ message: `Restaurant not found` });
    
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
