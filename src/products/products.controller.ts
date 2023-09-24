import { Controller, Get, Post, Body, Patch, Put, Param, Delete, Logger, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/config/multer.config';

@Controller(  )
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @Post(':slug/products/create')
  @UseInterceptors(FileInterceptor('image', { storage: storage }))
  create(@Param('slug') slug: string, @UploadedFile()file:Express.Multer.File, @Body() createProductDto: CreateProductDto) {
    return this.productsService.create(slug, createProductDto, file);
  }

  @Get(':slug/products')
  findAll(@Param('slug') slug: string) {
    return this.productsService.restaurantProducts(slug);
  }

  @Get(':restaurantSlug/products/:productSlug')
  findOne(
    @Param('restaurantSlug') restaurantSlug: string,
    @Param('productSlug') productSlug: string,
  ) {
      return this.productsService.findOne(restaurantSlug, productSlug);
    }

  @Patch(':restaurantSlug/products/:productSlug')
  @UseInterceptors(FileInterceptor('image', { storage: storage }))
  update(@Param('restaurantSlug') restaurantSlug: string, @Param('productSlug') productSlug: string, @UploadedFile()file:Express.Multer.File, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(restaurantSlug, productSlug, updateProductDto, file);
  }

  @Delete(':slug/products/:id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
