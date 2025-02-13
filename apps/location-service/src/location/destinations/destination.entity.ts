import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export class Destination extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    type: string;
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);
export type DestinationDocument = Destination & Document;