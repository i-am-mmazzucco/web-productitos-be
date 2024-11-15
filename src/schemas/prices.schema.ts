import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Price extends Document {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;
}

export const PriceSchema = SchemaFactory.createForClass(Price);
