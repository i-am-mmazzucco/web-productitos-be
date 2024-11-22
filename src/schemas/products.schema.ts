import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: false })
  image?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({
    type: [Number],
    required: true,
    validate: {
      validator: function (value: number[]) {
        return value.length === 2;
      },
      message:
        'Coordinates must contain exactly two numbers: [longitude, latitude]',
    },
  })
  coordinates: [number, number];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Store' }], required: true })
  stores: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Price' }], required: true })
  prices: Types.ObjectId[];

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;

  _id: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
