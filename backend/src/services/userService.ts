import { IUserRepository } from "../repositories/IUserRepository.js";
import bcrypt from "bcrypt";
import { IUser } from "../domain/models/IUser.js";


export class UserService {
    constructor(private userRepo: IUserRepository) { }


    async register(email: string, password: string): Promise<IUser> {
        const hashed = await bcrypt.hash(password, 10);
        return this.userRepo.create({ email, password: hashed } as Partial<IUser>);
    }


    async findByEmail(email: string) {
        return this.userRepo.findByEmail(email);
    }


    async findById(id: string) {
        return this.userRepo.findById(id);
    }


    async save(user: IUser) {
        return this.userRepo.save(user);
    }
}