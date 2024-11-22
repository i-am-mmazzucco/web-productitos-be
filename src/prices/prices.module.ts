import { Module } from '@nestjs/common';
import { PricesService } from './prices.service';
import { Price, PriceSchema } from '../schemas/prices.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Price.name, schema: PriceSchema }]),
  ],
  providers: [PricesService],
  exports: [PricesService],
})
export class PricesModule {}
