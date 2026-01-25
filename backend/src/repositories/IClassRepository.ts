import {IClass} from "../domain/models/IClass.js";


export interface IClassRepository {
    findAll(): Promise<IClass[]>;

    findByIdNumber(id: number): Promise<IClass | null>;

    findByObjectId(id: string): Promise<IClass | null>;

    create(data: Partial<IClass>): Promise<IClass>;

    update(id: string, data: Partial<IClass>): Promise<IClass | null>;

    delete(id: string): Promise<boolean>;
}