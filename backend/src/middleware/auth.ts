import type { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

export default function (req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET || "secret");
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
