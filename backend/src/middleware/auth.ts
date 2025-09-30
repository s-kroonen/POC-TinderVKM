// middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    logger.warn("Unauthorized request - no token provided", {
      path: req.path,
      method: req.method,
    });
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    logger.warn("Unauthorized request - invalid token format", {
      path: req.path,
      method: req.method,
    });
    return res.status(401).json({ error: "Invalid token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as { id: string };
    req.user = { id: decoded.id };

    logger.info("Token verified", {
      userId: decoded.id,
      path: req.path,
      method: req.method,
    });

    next();
  } catch (err) {
    logger.error("JWT verification failed", {
      path: req.path,
      method: req.method,
      error: err instanceof Error ? err.message : err,
    });
    return res.status(401).json({ error: "Invalid token" });
  }
}
