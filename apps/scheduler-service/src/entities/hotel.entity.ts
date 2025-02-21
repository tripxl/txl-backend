import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Hotel extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  address: string;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
export type HotelDocument = Hotel & Document;
