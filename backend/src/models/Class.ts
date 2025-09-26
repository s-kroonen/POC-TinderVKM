import { Schema, model, Document } from "mongoose";

// Define an interface for TypeScript
export interface IClass extends Document {
  id: number;
  name: string;
  shortdescription: string;
  description: string;
  content: string;
  studycredit: number;
  location: string;
  contact_id: number;
  level: string;
  learningoutcomes: string;
  Rood: number;
  Groen: number;
  Blauw: number;
  Geel: number;
  module_tags: string[]; // store as array
  interests_match_score: number;
  popularity_score: number;
  estimated_difficulty: number;
  available_spots: number;
  start_date: string; // or Date if you want to convert
}

// Mongoose schema
const classSchema = new Schema<IClass>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  shortdescription: { type: String },
  description: { type: String },
  content: { type: String },
  studycredit: { type: Number },
  location: { type: String },
  contact_id: { type: Number },
  level: { type: String },
  learningoutcomes: { type: String },
  Rood: { type: Number },
  Groen: { type: Number },
  Blauw: { type: Number },
  Geel: { type: Number },
  module_tags: { type: [String], default: [] },
  interests_match_score: { type: Number },
  popularity_score: { type: Number },
  estimated_difficulty: { type: Number },
  available_spots: { type: Number },
  start_date: { type: String },
});

export default model<IClass>("Class", classSchema, "vkm");
