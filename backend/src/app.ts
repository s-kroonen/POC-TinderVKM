import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./config/index.js";
import logger from "./utils/logger.js";
import authRoutes from "./presentation/routes/auth.routes.js";
import classRoutes from "./presentation/routes/class.routes.js";
import errorHandler from "./middleware/errorHandler.js";
import requestLogger from "./middleware/requestLogger.js";
import passport from "./infra/passport.js";


const allowedOrigins = [
  config.frontendUrl,
  "https://localhost",
//   "http://localhost", // optional for dev
];
export const createApp = async () => {
    logger.info("Config variables", {
        port: config.port,
        mongoUri: config.mongoUri,
        frontendUrl: config.frontendUrl,
    });
    await mongoose.connect(config.mongoUri!);
    logger.info("Connected to mongo");
    const app = express();
    app.use(cors({
        origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },  // frontend origin
        credentials: true,                 // if you use cookies/JWT in headers
    }));
    app.use(express.json());
    app.use(requestLogger);
    // Passport initialization for OAuth flows
    app.use(passport.initialize());
    app.use("/api/auth", authRoutes);
    app.use("/api/classes", classRoutes);
    app.use(errorHandler);
    return app;
};
const app = await createApp();
export default app;
