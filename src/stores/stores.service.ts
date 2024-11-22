import { Injectable } from '@nestjs/common';
import { Store } from '../schemas/stores.schema';
import { ICoordinates } from './stores.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StoresService {
  constructor(@InjectModel(Store.name) private storeModel: Model<Store>) {}

  async upsertStore(
    storeName: string,
    coordinates: ICoordinates,
  ): Promise<Store> {
    let store = await this.storeModel.findOne({ name: storeName }).exec();

    if (!store) {
      store = new this.storeModel({
        name: storeName,
        lat: coordinates.lat,
        long: coordinates.lng,
      });
      await store.save();
    }

    return store;
  }
}
