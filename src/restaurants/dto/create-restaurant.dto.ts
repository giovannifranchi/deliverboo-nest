import { IsString, IsOptional, IsDecimal, IsInt, Length, MaxLength, IsArray } from 'class-validator';
import { IsValidTypology } from 'src/decorators/isValidTypology.decorator';

export class CreateRestaurantDto {
  @IsInt()
  user_id: number;

  @IsString()
  @Length(1, 40)
  name: string;

  @IsString()
  @Length(1, 50)
  slug: string;

  @IsString()
  @Length(1, 50)
  vat_number: string;

  @IsString()
  @Length(1, 80)
  address: string;

  @IsOptional()
  @IsString()
  @Length(1, 5)
  postal_code?: string;

  @IsString()
  @Length(1, 20)
  city: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  business_times?: string;

  @IsString()
  @Length(1, 15)
  phone_number: string;

  @IsDecimal()
  delivery_cost: number;

  @IsDecimal()
  min_purchase: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  image?: string;

  // For relationships, depending on how you handle it in the API, 
  // you might want to only accept an array of IDs or a more complex object structure.
  // Here's a basic approach, accepting only an array of IDs for the related entities:

  @IsOptional()
  @IsArray()
  ordersIds?: number[];

  @IsOptional()
  @IsArray()
  productsIds?: number[];

  @IsOptional()
  @IsArray()
  @IsValidTypology()
  restaurant_typologyIds?: number[];
}
