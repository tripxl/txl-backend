import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export class Country extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    isDomestic: boolean;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
export type CountryDocument = Country & Document;