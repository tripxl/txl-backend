import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class State extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false, type: Types.ObjectId, ref: 'Country' })
  country: Types.ObjectId;
}

export const StateSchema = SchemaFactory.createForClass(State);
export type StateDocument = State & Document;
