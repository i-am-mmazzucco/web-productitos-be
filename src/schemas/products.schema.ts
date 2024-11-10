import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Store' }], required: true })
  stores: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Price' }], required: true })
  prices: Types.ObjectId[];

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
