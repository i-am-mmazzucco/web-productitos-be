import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  CreatePriceBodyDto,
  CreateProductBodyDto,
  ProductIdParamsDto,
} from './products.dto';
import { Product } from '../schemas/products.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }

  @Post()
  async sendEmail(@Body() body: CreateProductBodyDto): Promise<void> {
    return this.productsService.sendEmail(body);
  }

  @Get('approve')
  async approveProduct(
    @Query('name') name: string,
    @Query('imageUrl') imageUrl: string,
    @Query('description') description?: string,
    @Query('category') category?: string,
  ): Promise<Product> {
    if (!name || !imageUrl) {
      throw new HttpException(
        'Missing required parameters',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.productsService.create({
      name,
      imageUrl,
      description,
      category,
    });
  }

  @Get(':productId')
  async getById(@Param() params: ProductIdParamsDto): Promise<Product> {
    return this.productsService.getById(params);
  }

  @Post(':productId/add-price')
  async createPrice(
    @Body() body: CreatePriceBodyDto,
    @Param() params: ProductIdParamsDto,
  ): Promise<Product> {
    return this.productsService.createPrice(body, params);
  }
}
