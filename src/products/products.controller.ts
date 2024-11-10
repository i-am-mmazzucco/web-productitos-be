import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(): Promise<string> {
    return this.productsService.getAll();
  }

  @Get()
  async getById(): Promise<string> {
    return this.productsService.getById();
  }
}
