import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SchoolRepository } from "./school.repository";
import { School } from "./school.schema";
import { ScraperService } from "../scraper/scraper.service";
import { IGoogleMapsData } from "../scraper/scraper.interface";
import { InstitutionType } from "./school.enum";

@Injectable()
export class SchoolService{
    constructor(
        private readonly schoolRepo: SchoolRepository,
        private readonly scraperSvc: ScraperService,
    ) {}

    public async findById(id: string): Promise<School> {
        return this.schoolRepo.findById({ _id: id } as any);
    }

    public async find(query: Partial<School>): Promise<School[]> {
        return this.schoolRepo.find(query);
    }

    public async findOne(query: Partial<School>): Promise<School> {
        return this.schoolRepo.findOne(query);
    }

    public async seed(): Promise<void> {
        try {
            const schools:IGoogleMapsData[] = await this.scraperSvc.scrapeGoogleMapsData("school", 50);
            const universities:IGoogleMapsData[] = await this.scraperSvc.scrapeGoogleMapsData("university", 50);
            const colleges:IGoogleMapsData[] = await this.scraperSvc.scrapeGoogleMapsData("college", 50);

            await this.createAll(schools as School[], InstitutionType.SCHOOL);
            await this.createAll(universities as School[], InstitutionType.UNIVERSITY);
            await this.createAll(colleges as School[], InstitutionType.COLLEGE);

            console.log("Seeding completed successfully");
            
        } catch (error) {
            throw new Error(`Unable to seed DB: ${error.message}`);
        }
    }

    public async createAll(schools: Partial<School[]>, institutionType: InstitutionType): Promise<void>{
        for(let school of schools){
            await this.schoolRepo.create({
                ...school,
                institutionType
            })
        }
    }
}