import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePriceBodyDto, ProductIdParamsDto } from './products.dto';
import { StoresService } from '../stores/stores.service';
import { PricesService } from '../prices/prices.service';
import { Product } from 'src/schemas/products.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { mergeUniqueIds } from './helpers/mapper';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly pricesService: PricesService,
    private readonly storesService: StoresService,
  ) {}

  async create(): Promise<any> {
    return {
      id: 1,
      name: 'Coca Cola Original 2,25 Litros',
      imageUrl:
        'https://http2.mlstatic.com/D_NQ_NP_839337-MLU72637726591_112023-O.webp',
      price: 123,
      location: "3km's",
    };
  }

  async createPrice(
    { amount, coordinates, storeName }: CreatePriceBodyDto,
    params: ProductIdParamsDto,
  ): Promise<Product> {
    const product = await this.getById(params);
    const store = await this.storesService.upsertStore(storeName, coordinates);
    const price = await this.pricesService.upsertPrice(
      amount,
      store._id.toString(),
    );

    return this.upsertProduct(params.productId, {
      stores: mergeUniqueIds(product.stores, store._id),
      prices: mergeUniqueIds(product.prices, price._id),
    });
  }

  async getById({ productId }: ProductIdParamsDto): Promise<Product> {
    const product = await this.productModel
      .findById(productId)
      .populate({ path: 'stores', model: 'Store' })
      .populate({ path: 'prices', model: 'Price' })
      .exec();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async getAll(): Promise<Product[]> {
    return this.productModel
      .find()
      .populate({ path: 'stores', model: 'Store' })
      .populate({ path: 'prices', model: 'Price' })
      .exec();
  }

  private async upsertProduct(
    id: string,
    updateData: Partial<Product>,
  ): Promise<Product> {
    const product = await this.productModel
      .findOneAndUpdate(
        { _id: id },
        { $set: updateData },
        {
          new: true, // Return the updated product
          upsert: false, // Not create new document if not exist
          runValidators: true, // Validate schema
        },
      )
      .exec();

    return product;
  }
}
