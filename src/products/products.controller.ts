import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }

  @Get(':id')
  async getById(): Promise<string> {
    return this.productsService.getById();
  }
}
