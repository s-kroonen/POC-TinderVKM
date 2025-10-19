import dotenv from "dotenv";
import path from "path";

// dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });


export default {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET || "secret",
    frontendUrl: process.env.FRONTEND_URL,
    clientID: process.env.MICROSOFT_CLIENT_ID!,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
    callbackURL: process.env.MICROSOFT_REDIRECT_URI!,
    tenant: process.env.MICROSOFT_TENANT_ID,
};