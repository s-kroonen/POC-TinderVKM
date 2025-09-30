// routes/auth.ts
import { Router } from "express";
import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.info("Register request received", { email });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash });

    logger.info("User registered successfully", { userId: user._id, email });
    res.json(user);
  } catch (err) {
    logger.error("User registration failed", {
      body: req.body,
      error: err instanceof Error ? err.message : err,
    });
    res.status(400).json({ error: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  logger.info("Login attempt", { email });

  const user = await User.findOne({ email });
  if (!user) {
    logger.warn("Login failed - user not found", { email });
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    logger.warn("Login failed - invalid password", { email, userId: user._id });
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret");
  logger.info("Login successful", { userId: user._id, email });
  res.json({ token });
});

export default router;
