import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { PrismaService } from 'src/prisma.service';
import slugify from 'slugify';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService){}
  create(createRestaurantDto: CreateRestaurantDto) {
    createRestaurantDto.slug = slugify(createRestaurantDto.name, {lower: true, strict: true});
    const { restaurant_typologyIds, ...restaurantData } = createRestaurantDto;
    try{
      return this.prisma.restaurants.create({
        data: {
          ...restaurantData,
          restaurant_typology: {
            create: restaurant_typologyIds.map((tipologyId) => ({ //this is same as Laravel's sync
              typology_id: tipologyId
            }))
          }
        }
      });
    }catch(error){
      return new Error(error)
    }
  }

  async allRestaurant() {
    return this.prisma.restaurants.findMany();
  }

  async allFilteredRestaurant(typologies: number[]) {

    const andConditions = typologies.map(typologyId => ({
      restaurant_typology: {
        some: {
          typology_id: typologyId
        }
      }
    }));
  
    const restaurants = await this.prisma.restaurants.findMany({
      where: {
        AND: andConditions
      }, 
      include: {
        restaurant_typology: {
          include: {
            typologies: true
          }
        }
      }
    });
  
    if(!restaurants || restaurants.length === 0) {
      throw new NotFoundException({message: 'No restaurants with these types'});
    }
  
    const flattedRestaurants = restaurants.map((restaurant) => {
      return { ...restaurant, restaurant_typology: restaurant.restaurant_typology.map(rt => rt.typologies) };
    });
  
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
