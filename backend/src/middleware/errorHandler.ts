import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";
export default function errorHandler(err: any, _req: Request, res: Response,
    _next: NextFunction) {
    logger.error("Unhandled error %o", err);
    res.status(500).json({ error: "Internal Server Error" });
}
