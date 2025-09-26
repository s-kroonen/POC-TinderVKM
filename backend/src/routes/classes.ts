import { Router } from "express";
import Class from "../models/Class";
import authMiddleware from "../middleware/auth";

const router = Router();

// List all classes
router.get("/", async (_req, res) => {
  const classes = await Class.find();
  res.json(classes);
});

// Like a class (authenticated)
router.post("/:id/like", authMiddleware, async (req, res) => {
  // Save liked class to user, etc.
  res.json({ success: true });
});

export default router;
