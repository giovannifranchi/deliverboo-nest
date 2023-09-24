import { IsBoolean, IsDecimal, IsInt, IsOptional, IsString, Length, MaxLength } from "class-validator";

export class CreateProductDto {

    @IsInt()
    restaurant_id: number;

    @IsString()
    @Length(1, 80)
    name: string;

    @IsString()
    @Length(1, 90)
    slug: string;

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

    @IsDecimal()
    price: number;

    @IsDecimal()
    discount: number;

    @IsBoolean()
    is_visible: boolean;
}
