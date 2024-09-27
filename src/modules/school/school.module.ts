import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { School, SchoolSchema } from "./school.schema";
import { SchoolRepository } from "./school.repository";
import { SchoolService } from "./school.service";
import { SchoolResolver } from "./school.resolver";
import { ScraperModule } from "../scraper/scraper.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            { 
                name: School.name, 
                schema: SchoolSchema 
            }
        ]),
        ScraperModule
    ],
    providers: [SchoolRepository, SchoolService, SchoolResolver],
    exports: [SchoolRepository, SchoolService]
})
export class SchoolModule{}