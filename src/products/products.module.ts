import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from '../schemas/products.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PricesModule } from '../prices/prices.module';
import { StoresModule } from '../stores/stores.module';
import { SeedService } from '../common/seed.service';
import { Price, PriceSchema } from '../schemas/prices.schema';
import { Store, StoreSchema } from '../schemas/stores.schema';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    EmailModule,
    PricesModule,
    StoresModule,
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Price.name, schema: PriceSchema },
      { name: Store.name, schema: StoreSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [SeedService, ProductsService],
})
export class ProductsModule {}
