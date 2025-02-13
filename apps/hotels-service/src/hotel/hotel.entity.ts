import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class Hotel extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'City' })
    city: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: 'Country' })
    country: Types.ObjectId;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
export type HotelDocument = Hotel & Document;