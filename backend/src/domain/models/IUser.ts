import { Document } from "mongoose";
import { IClass } from "./IClass.js";


export interface IUser extends Document {
email: string;
password?: string;
microsoftId?: string;
liked: IClass[] | string[];
skipped: IClass[] | string[];
}