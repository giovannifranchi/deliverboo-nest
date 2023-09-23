import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { PrismaService } from 'src/prisma.service';
import slugify from 'slugify';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService){}
  async create(createRestaurantDto: CreateRestaurantDto, file: File) {
    try{

      return file;
      createRestaurantDto.slug = slugify(createRestaurantDto.name, {lower: true, strict: true});
      const { restaurant_typologyIds, ...restaurantData } = createRestaurantDto;
  
      const createdReastaurant = await this.prisma.restaurants.create({
        data: restaurantData
      })

  
      if(restaurant_typologyIds && restaurant_typologyIds.length > 0){
        await this.prisma.restaurant_typology.createMany({
          data: restaurant_typologyIds.map((id) => {
            return {restaurant_id: createdReastaurant.id, typology_id: id}
          })
        })
      }

      return createdReastaurant;
    }catch(error){
      return HttpErrorByCode;
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
