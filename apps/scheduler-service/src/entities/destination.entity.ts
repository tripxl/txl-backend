import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Destination extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);
export type DestinationDocument = Destination & Document;
