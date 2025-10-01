import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import passport from "passport";

import authRoutes from "./routes/auth.js";
import classRoutes from "./routes/classes.js";

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());
app.use(passport.initialize()); 

app.use("/api/auth", authRoutes);
app.use("/api/classes", classRoutes);

mongoose.connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => console.log("Server running on port " + process.env.PORT));
  })
  .catch(err => console.error(err));
