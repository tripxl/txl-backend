import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Continent extends Document {
  @Prop({ required: true })
  name: string;
}

export const ContinentSchema = SchemaFactory.createForClass(Continent);
export type ContinentDocument = Continent & Document;
