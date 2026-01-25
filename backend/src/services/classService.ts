import {IClassRepository} from "../repositories/IClassRepository.js";
import {IClass} from "../domain/models/IClass.js";
import { ClassSchema } from "../domain/class.schema.js";
import { ZodError } from "zod";
function validate(data: any) {
    const errors: Record<string, string> = {};

    if (!data.name) errors.name = "Name is required";
    if (data.studycredit != null && data.studycredit < 0)
        errors.studycredit = "Study credits must be >= 0";

    if (Object.keys(errors).length > 0) {
        throw {status: 400, errors};
    }
}

export class ClassService {

    constructor(private classRepo: IClassRepository) {
    }

    async create(data: any) {
        try {
            const parsed = ClassSchema.parse(data);
            return await this.classRepo.create(parsed);
        } catch (err) {
            if (err instanceof ZodError) {
                throw {status: 400, errors: this.mapZod(err)};
            }
            throw err;
        }
    }

    async update(id: string, data: any) {
        try {
            const parsed = ClassSchema.parse(data);
            return await this.classRepo.update(id, parsed);
        } catch (err) {
            if (err instanceof ZodError) {
                throw {status: 400, errors: this.mapZod(err)};
            }
            throw err;
        }
    }

    private mapZod(err: ZodError) {
        const errors: Record<string, string> = {};
        err.issues.forEach(e => {
            if (e.path[0]) errors[e.path[0].toString()] = e.message;
        });
        return errors;
    }

    async remove(id: string) {
        return this.classRepo.delete(id);
    }

    async getAll(): Promise<IClass[]> {
        return this.classRepo.findAll();
    }


    async getByIdNumber(id: number): Promise<IClass | null> {
        return this.classRepo.findByIdNumber(id);
    }
}