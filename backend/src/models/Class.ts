import { Schema, model, Document } from "mongoose";

export interface IClass extends Document {
  name: string;
  description: string;
  location: string;
  teachers: string[];
  attendees: string[];
  capacity: number;
  categories: string[];
}

const classSchema = new Schema<IClass>({
  name: String,
  description: String,
  location: String,
  teachers: [String],
  attendees: [String],
  capacity: Number,
  categories: [String]
});

export default model<IClass>("Class", classSchema);
