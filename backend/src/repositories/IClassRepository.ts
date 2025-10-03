import { IClass } from "../domain/models/IClass.js";


export interface IClassRepository {
findAll(): Promise<IClass[]>;
findByIdNumber(id: number): Promise<IClass | null>;
findByObjectId(id: string): Promise<IClass | null>;
}