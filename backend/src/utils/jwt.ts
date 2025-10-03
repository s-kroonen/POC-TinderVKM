import jwt from "jsonwebtoken";
import config from "../config/index.js";


export function signToken(payload: object) {
return jwt.sign(payload, config.jwtSecret, { expiresIn: "7d" });
}


export function verifyToken(token: string) {
return jwt.verify(token, config.jwtSecret);
}