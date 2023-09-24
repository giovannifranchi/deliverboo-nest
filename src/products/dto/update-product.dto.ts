import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsInt, IsOptional, IsString, Length, MaxLength, IsNumber, IsBoolean } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsInt()
    @IsOptional()
    restaurant_id?: number;
  
    @IsString()
    @Length(1, 80)
    @IsOptional()
    name?: string;
  
    @IsString()
    @Length(1, 90)
    @IsOptional()
    slug?: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsString()
    ingridients?: string;
  
    @IsOptional()
    @IsString()
    @MaxLength(255)
    image?: string;
  
    @IsNumber()
    @IsOptional()
    price?: number;
  
    @IsNumber()
    @IsOptional()
    discount?: number;
  
    @IsOptional()
    is_visible?: string;
}
