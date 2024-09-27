import { Field, ID, InputType, ObjectType, PartialType, registerEnumType } from "@nestjs/graphql";
import { InstitutionType } from "./school.enum";

registerEnumType(InstitutionType, {
    name: "InstitutionType"
});

@ObjectType()
export class School{
    @Field((type) => ID, {nullable: false})
    _id: string;

    @Field({})
    title: string;

    @Field({})
    address: string;

    @Field({})
    latitude: string;

    @Field({})
    longitude: string;

    @Field({})
    placeId: string;

    @Field((type) => InstitutionType, {})
    institutionType: InstitutionType;
}

@InputType()
export class CommonSchoolInput{
    @Field((type) => ID, {nullable: true})
    _id?: string;

    @Field({nullable: true})
    title?: string;

    @Field({nullable: true})
    latitude?: string;

    @Field({nullable: true})
    longitude?: string;

    @Field({nullable: true})
    placeId?: string;

    @Field((type) => InstitutionType, {nullable: true})
    institutionType?: InstitutionType;
}

@InputType()
export class QuerySchoolInput extends PartialType(CommonSchoolInput){}

