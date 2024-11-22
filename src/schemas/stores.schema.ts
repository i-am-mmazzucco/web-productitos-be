import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Store extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lat: string;

  @Prop({ required: true })
  long: string;

  _id: Types.ObjectId;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
