import { IsString, IsNumber, ValidateNested } from 'class-validator';
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
