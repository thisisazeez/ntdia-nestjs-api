import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { InstitutionType } from "./school.enum";

export type SchoolDocument = School & Document;

@Schema({collection: "educational_institutions", timestamps: true})
export class School{
    _id: Types.ObjectId;

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    address: string;

    @Prop({required: true})
    latitude: string;

    @Prop({required: true})
    longitude: string;

    @Prop({required: true})
    placeId: string;

    @Prop({required: true, enum: InstitutionType})
    institutionType: InstitutionType;
}

export const SchoolSchema = SchemaFactory.createForClass(School);