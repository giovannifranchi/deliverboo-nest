import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  // Get the restaurant using the slug, use its id to find the products connected to the restaurant
  async restaurantProducts(restaurantSlug: string) {

    const restaurant = await this.prisma.restaurants.findFirst({
      where: {
        slug: restaurantSlug,
      }
    });

    if (!restaurant) {
      throw new NotFoundException(`Restaurant with slug '${restaurantSlug}'`)
    }

    const products = await this.prisma.products.findMany({
      where: {
        restaurant_id: restaurant.id,
      },
    });

    return products;

  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
