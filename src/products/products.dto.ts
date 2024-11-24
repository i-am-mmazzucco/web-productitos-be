import {
  IsString,
  IsNumber,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CoordinatesDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}

export class CreatePriceBodyDto {
  @IsString()
  storeName: string;

  @ValidateNested()
  @Type(() => CoordinatesDto)
  coordinates: CoordinatesDto;

  @IsNumber()
  amount: number;
}

export class ProductIdParamsDto {
  @IsString()
  productId: string;
}

export class CreateProductBodyDto {
  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  name: string;

  @IsString()
  imageUrl: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  category?: string;
}
