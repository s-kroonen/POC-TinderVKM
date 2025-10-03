import { IUser } from "../domain/models/IUser.js";


export interface IUserRepository {
create(data: Partial<IUser>): Promise<IUser>;
findByEmail(email: string): Promise<IUser | null>;
findById(id: string): Promise<IUser | null>;
save(user: IUser): Promise<IUser>;
}