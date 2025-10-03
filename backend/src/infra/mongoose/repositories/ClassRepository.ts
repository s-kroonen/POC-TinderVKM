import { IClassRepository } from "../../../repositories/IClassRepository.js";
import ClassModel from "../models/ClassModel.js";
import { IClass } from "../../../domain/models/IClass.js";


export class ClassRepository implements IClassRepository {
async findAll(): Promise<IClass[]> {
return ClassModel.find().exec();
}


async findByIdNumber(id: number): Promise<IClass | null> {
return ClassModel.findOne({ id }).exec();
}


async findByObjectId(id: string): Promise<IClass | null> {
return ClassModel.findById(id).exec();
}
}