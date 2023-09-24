import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import slugify from 'slugify';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }
  
  async create(slug: string, createProductDto: CreateProductDto, file: Express.Multer.File) {
    
    try {

      const restaurant = await this.prisma.restaurants.findFirst({
        where: {
          slug: slug,
        }
      });
  
      
      createProductDto.slug = slugify(createProductDto.name, {lower: true, strict: true});
      createProductDto.image = file ? 'uploads/' + file.filename : null;
      createProductDto.restaurant_id = restaurant.id as unknown as number;
      const { ...productData } = createProductDto
  
      const createdProduct = await this.prisma.products.create({
        data: productData
      }) 
  
        return createdProduct;

    } catch(error) {

      console.log(error);
      return error;
    }
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

  async findOne(restaurantSlug: string, productSlug: string) {
    const restaurant = await this.prisma.restaurants.findFirst({
      where: {
        slug: restaurantSlug,
      }
    });

    if (!restaurant) {
      throw new NotFoundException(`Restaurant with slug '${restaurantSlug}'`)
    }

    const product = await this.prisma.products.findFirst({
      where: {
        restaurant_id: restaurant.id,
        slug: productSlug,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with slug '${productSlug}'`)
    }

    return product;
  }

  async update(restaurantSlug: string, productSlug: string, updateProductDto: UpdateProductDto, file: Express.Multer.File) {
    try {

      const restaurant = await this.prisma.restaurants.findFirst({
        where: {
          slug: restaurantSlug,
        }
      });
  
      if (!restaurant) {
        throw new NotFoundException(`Restaurant with slug '${restaurantSlug}' not found`);
      }
      
      updateProductDto.slug = slugify(updateProductDto.name, {lower: true, strict: true});
      updateProductDto.image = file ? 'uploads/' + file.filename : null;
      const { ...productData } = updateProductDto

      const product = await this.prisma.products.findFirst({
        where: {
          slug: productSlug,
        }
      })
  
      const createdProduct = await this.prisma.products.update({
        where: {
          restaurant_id: restaurant.id,
          id: product.id,
        },
        data: productData
      }) 
  
        return createdProduct;

    } catch(error) {

      console.log(error);
      return error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
