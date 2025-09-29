import { Schema, model, Document } from "mongoose";
import { IClass } from "./Class.js";

export interface IUser extends Document {
  email: string;
  password: string;
  liked: IClass[];
  skipped: IClass[];
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  liked: [{ type: Schema.Types.ObjectId, ref: "Class" }],
  skipped: [{ type: Schema.Types.ObjectId, ref: "Class" }]
});
export default model<IUser>("User", userSchema);

