import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { School, SchoolDocument } from "./school.schema";
import { Model, Types } from "mongoose";

@Injectable()
export class SchoolRepository{
    constructor(
        @InjectModel(School.name)
        private schoolModel: Model<SchoolDocument>
    ) {}

    public async create(model: School): Promise<School> {
        const createdSchool = new this.schoolModel({
          ...this.mapIds(model),
          createdAt: Date.now(),
        });
        return await createdSchool.save();
    }
    
    public async update(id: string, model: Partial<School>): Promise<School> {
        await this.schoolModel.updateOne(
            { _id: id },
            {
            ...this.mapIds(model),
            updatedAt: Date.now(),
            }
        );
        return this.findById(id);
    }
    
    public async deleteMany(model: Partial<School>): Promise<void> {
        await this.schoolModel.deleteMany(this.mapIds(model));
    }
    
    public async delete (id: string): Promise<void>  {
        await this.schoolModel.deleteOne({ _id: new Types.ObjectId(id) });
    }
    
    public async find(query: Partial<School>): Promise<Array<School>> {
        return this.schoolModel.find(this.mapIds(query));
    }
    
    public async findOne(query: Partial<School>): Promise<School>  {
        return this.schoolModel.findOne(this.mapIds(query));
    }
    
    public async findById(id: string): Promise<School> {
        return this.schoolModel.findById(id);
    }
    
    private mapIds(model: Partial<School>): Partial<School>{
        if (model._id) model._id = new Types.ObjectId(model._id);

        return model;
    }
}