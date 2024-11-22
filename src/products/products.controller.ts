import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreatePriceBodyDto, ProductIdParamsDto } from './products.dto';
import { Product } from '../schemas/products.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }

  @Post()
  async create(): Promise<Product> {
    return this.productsService.create();
  }

  @Get(':productId')
  async getById(@Param() params: ProductIdParamsDto): Promise<Product> {
    return this.productsService.getById(params);
  }

  @Post(':productId/add-price')
  async createPrice(
    @Body() body: CreatePriceBodyDto,
    @Param() params: ProductIdParamsDto,
  ): Promise<any> {
    return this.productsService.createPrice(body, params);
  }
}
