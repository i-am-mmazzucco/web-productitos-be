import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Price extends Document {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ type: Types.ObjectId, ref: 'Store', required: true })
  store: Types.ObjectId;

  _id: Types.ObjectId;
}

export const PriceSchema = SchemaFactory.createForClass(Price);
