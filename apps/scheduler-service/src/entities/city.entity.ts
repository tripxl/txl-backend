import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class City extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  state: string;

  @Prop()
  country: string;
}

export const CitySchema = SchemaFactory.createForClass(City);
export type CityDocument = City & Document;
