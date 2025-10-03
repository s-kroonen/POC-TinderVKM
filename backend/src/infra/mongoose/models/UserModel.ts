import { Schema, model } from "mongoose";
import { IUser } from "../../../domain/models/IUser.js";


const userSchema = new Schema<IUser>({
email: { type: String, required: true, unique: true },
password: { type: String },
microsoftId: { type: String },
liked: [{ type: Schema.Types.ObjectId, ref: "Class" }],
skipped: [{ type: Schema.Types.ObjectId, ref: "Class" }],
});


export default model<IUser>("User", userSchema);