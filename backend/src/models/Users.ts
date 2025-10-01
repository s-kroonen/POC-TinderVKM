import { Schema, model, Document } from "mongoose";
import { IClass } from "./Class.js";

export interface IUser extends Document {
  email: string;
  password: string;
  microsoftId?: string;
  liked: IClass[];
  skipped: IClass[];
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // still for email login
  microsoftId: { type: String }, // added for OAuth
  liked: [{ type: Schema.Types.ObjectId, ref: "Class" }],
  skipped: [{ type: Schema.Types.ObjectId, ref: "Class" }],
});

export default model<IUser>("User", userSchema);

