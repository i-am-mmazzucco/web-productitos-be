import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Store } from '../schemas/stores.schema';
import { Price } from '../schemas/prices.schema';
import { Product } from '../schemas/products.schema';

import initialStoresJson from './initial-stores.json';
import initialProductsJson from './initial-products.json';
import initialPricesJson from './initial-prices.json';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Price.name) private priceModel: Model<Price>,
    @InjectModel(Store.name) private storeModel: Model<Store>,
  ) {}

  async onModuleInit() {
    const productCount = await this.productModel.countDocuments().exec();

    if (productCount === 0) {
      console.log('Database is empty, seeding initial products...');

      const initialProducts: Product[] = initialProductsJson.map((product) => ({
        ...product,
        name: product.name,
        timestamp: new Date(),
      })) as unknown as Product[];

      const products = await this.productModel.insertMany(initialProducts);

      const initialStores: Store[] = initialStoresJson.map((store) => ({
        ...store,
        name: store.name.toLowerCase(),
      })) as Store[];

      const stores = await this.storeModel.insertMany(initialStores);

      const initialPrices: Price[] = initialPricesJson.map((price) => {
        const product = products.find(
          (product) => product.name === price.product,
        );

        return {
          ...price,
          product: product._id,
          store: stores[Math.floor(Math.random() * 5)]._id,
        };
      }) as Price[];
      const prices = await this.priceModel.insertMany(initialPrices);

      for (const product of products) {
        const productPrices = prices.filter(
          (price) => price.product.toString() === product._id.toString(),
        );

        const productStores = productPrices.map((price) => price.store);

        await this.productModel.findByIdAndUpdate(product._id, {
          $set: {
            prices: productPrices.map((price) => price._id),
            stores: productStores,
          },
        });
      }

      console.log('Seeding complete!');
    } else {
      console.log('Database already has data, skipping seeding.');
    }
  }
}
