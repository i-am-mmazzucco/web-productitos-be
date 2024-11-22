import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from '../schemas/products.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PricesModule } from '../prices/prices.module';
import { StoresModule } from '../stores/stores.module';
import { SeedService } from '../common/seed.service';

@Module({
  imports: [
    PricesModule,
    StoresModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [SeedService, ProductsService],
})
export class ProductsModule {}
