import { IClassRepository } from "../repositories/IClassRepository.js";
import { IClass } from "../domain/models/IClass.js";


export class ClassService {
constructor(private classRepo: IClassRepository) {}


async getAll(): Promise<IClass[]> {
return this.classRepo.findAll();
}


async getByIdNumber(id: number): Promise<IClass | null> {
return this.classRepo.findByIdNumber(id);
}
}