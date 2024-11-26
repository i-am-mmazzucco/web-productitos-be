import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  CreatePriceBodyDto,
  CreateProductBodyDto,
  ProductIdParamsDto,
} from './products.dto';
import { Product } from '../schemas/products.schema';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }

  @Post('approve')
  async approveProduct(
    @Res() res: Response,
    @Query('name') name: string,
    @Query('imageUrl') imageUrl: string,
    @Query('description') description?: string,
    @Query('category') category?: string,
  ): Promise<void> {
    if (!name || !imageUrl) {
      throw new HttpException(
        'Missing required parameters',
        HttpStatus.BAD_REQUEST,
      );
    }

    const url = await this.productsService.create({
      name,
      imageUrl,
      description,
      category,
    });

    return res.redirect(301, url);
  }

  @Get('reject')
  rejectProduct(@Res() res: Response): void {
    return res.redirect(301, `http://localhost:3000`);
  }

  @Post()
  async sendEmail(@Body() body: CreateProductBodyDto): Promise<void> {
    return this.productsService.sendEmail(body);
  }

  @Post(':productId/add-price')
  async createPrice(
    @Body() body: CreatePriceBodyDto,
    @Param() params: ProductIdParamsDto,
  ): Promise<Product> {
    return this.productsService.createPrice(body, params);
  }

  @Get(':productId')
  async getById(@Param() params: ProductIdParamsDto): Promise<Product> {
    return this.productsService.getById(params);
  }
}
