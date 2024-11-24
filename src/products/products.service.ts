import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreatePriceBodyDto,
  CreateProductBodyDto,
  ProductIdParamsDto,
} from './products.dto';
import { StoresService } from '../stores/stores.service';
import { PricesService } from '../prices/prices.service';
import { Product } from 'src/schemas/products.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { mergeUniqueIds } from './helpers/mapper';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly pricesService: PricesService,
    private readonly storesService: StoresService,
    private readonly emailService: EmailService,
  ) {}

  async create(body: CreateProductBodyDto): Promise<Product> {
    const newProduct = new this.productModel(body);
    return newProduct.save();
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
      product._id.toString(),
    );

    return this.upsertProduct(params.productId, {
      stores: mergeUniqueIds(
        product.stores.map((store) => store._id),
        store._id,
      ),
      prices: mergeUniqueIds(
        product.prices.map((price) => price._id),
        price._id,
      ),
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

  async sendEmail(body: CreateProductBodyDto): Promise<void> {
    return this.emailService.sendProductApprovalEmail(body);
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
