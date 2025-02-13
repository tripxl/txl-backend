import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class City extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Country' })
  country: Types.ObjectId;

  @Prop({ required: false, type: Types.ObjectId, ref: 'State' })
  state: Types.ObjectId;
}

export const CitySchema = SchemaFactory.createForClass(City);
export type CityDocument = City & Document;
