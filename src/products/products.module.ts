import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from '../schemas/products.schema';
import { Store, StoreSchema } from '../schemas/stores.schema';
import { Price, PriceSchema } from '../schemas/prices.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Store.name, schema: StoreSchema },
      { name: Price.name, schema: PriceSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
