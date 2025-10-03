import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";
import logger from "../utils/logger.js";
export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    logger.warn("Unauthorized - no token", { path: req.path });
    return res.status(401).json({ error: "No token provided" });
  }
  const parts = authHeader.split(" ");
  if (parts.length !== 2) return res.status(401).json({
    error: "Invalid token format"
  });
  try {
    const decoded = verifyToken(parts[1]) as any;
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    logger.warn("Invalid token", { err });
    return res.status(401).json({ error: "Invalid token" });
  }
}
