import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Store extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lat: string;

  @Prop({ required: true })
  long: string;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
