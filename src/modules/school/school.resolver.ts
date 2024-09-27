import { Args, Query, Resolver } from "@nestjs/graphql";
import { QuerySchoolInput, School } from "./school.dto";
import { SchoolService } from "./school.service";

@Resolver((of) => School)
export class SchoolResolver{
    constructor(
        private readonly schoolSvc: SchoolService
    ) {}

    @Query((returns) => School, { name: "findOneSchool" })
    public async findOne(@Args("query") query: QuerySchoolInput) {
        return this.schoolSvc.findOne(query as any);
    }

    @Query((returns) => [School], { name: "findSchools" })
    public async find(@Args("query") query: QuerySchoolInput) {
        return this.schoolSvc.find(query as any);
    }

    @Query((returns) => School, { name: "findSchoolById" })
    public async findById(@Args("id") id: string) {
        return this.schoolSvc.findById(id);
    }
}