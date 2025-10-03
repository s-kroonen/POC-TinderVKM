import { IUserRepository } from "../../../repositories/IUserRepository.js";
import UserModel from "../models/UserModel.js";
import { IUser } from "../../../domain/models/IUser.js";


export class UserRepository implements IUserRepository {
async create(data: Partial<IUser>): Promise<IUser> {
const u = new UserModel(data);
return u.save();
}


async findByEmail(email: string): Promise<IUser | null> {
return UserModel.findOne({ email }).exec();
}


async findById(id: string): Promise<IUser | null> {
return UserModel.findById(id).exec();
}


async save(user: IUser): Promise<IUser> {
return user.save();
}
}