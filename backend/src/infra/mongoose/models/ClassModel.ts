import { Schema, model } from "mongoose";
import { IClass } from "../../../domain/models/IClass.js";


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