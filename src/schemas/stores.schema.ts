import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Store extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lat: number;

  @Prop({ required: true })
  long: number;

  _id: Types.ObjectId;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
