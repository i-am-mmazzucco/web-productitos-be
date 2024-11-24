import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Price } from 'src/schemas/prices.schema';
import { Model } from 'mongoose';

@Injectable()
export class PricesService {
  constructor(@InjectModel(Price.name) private priceModel: Model<Price>) {}

  async upsertPrice(
    amount: number,
    storeId: string,
    productId: string,
    currency = 'ARS',
  ): Promise<Price> {
    let price = await this.priceModel.findOne({ store: storeId }).exec();

    if (price) {
      price.amount = amount;
      price.currency = currency;
      await price.save();
    } else {
      price = new this.priceModel({
        amount,
        currency,
        store: storeId,
        product: productId,
      });
      await price.save();
    }

    return price;
  }
}
