import {IClassRepository} from "../../../repositories/IClassRepository.js";
import ClassModel from "../models/ClassModel.js";
import {IClass} from "../../../domain/models/IClass.js";


export class ClassRepository implements IClassRepository {
    async findAll(): Promise<IClass[]> {
        return ClassModel.find().exec();
    }


    async findByIdNumber(id: number): Promise<IClass | null> {
        return ClassModel.findOne({id}).exec();
    }


    async findByObjectId(id: string): Promise<IClass | null> {
        return ClassModel.findById(id).exec();
    }
    async create(data: Partial<IClass>): Promise<IClass> {
        return ClassModel.create(data);
    }

    async update(id: string, data: Partial<IClass>): Promise<IClass | null> {
        return ClassModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async delete(id: string): Promise<boolean> {
        const res = await ClassModel.findByIdAndDelete(id).exec();
        return !!res;
    }

}