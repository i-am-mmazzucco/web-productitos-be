import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { Store, StoreSchema } from '../schemas/stores.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
  ],
  providers: [StoresService],
  exports: [StoresService],
})
export class StoresModule {}
