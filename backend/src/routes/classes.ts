// routes/classes.ts
import { Router } from "express";
import Class from "../models/Class.js";
import User from "../models/Users.js";
import authMiddleware from "../middleware/auth.js";
import logger from "../utils/logger.js";

const router = Router();

// Get all classes
router.get("/", async (_req, res) => {
  try {
    const classes = await Class.find();
    logger.info("Fetched all classes", { count: classes.length });
    res.json(classes);
  } catch (err) {
    logger.error("Failed to fetch classes", { error: err instanceof Error ? err.message : err });
    res.status(500).json({ error: "Failed to fetch classes" });
  }
});

// Get a single class by ID
router.get("/:id", async (req, res) => {
  try {
    const classItem = await Class.findOne({ id: Number(req.params.id) });
    if (!classItem) {
      logger.warn("Class not found", { id: req.params.id });
      return res.status(404).json({ error: "Class not found" });
    }
    logger.info("Fetched class by ID", { id: req.params.id });
    res.json(classItem);
  } catch (err) {
    logger.error("Failed to fetch class", { id: req.params.id, error: err instanceof Error ? err.message : err });
    res.status(500).json({ error: "Failed to fetch class" });
  }
});

function getUserId(req: Express.Request): string {
  if (!req.user) throw new Error("User not found on request");
  return (req.user as { id: string }).id;
}

router.post("/me/set-preferences", authMiddleware, async (req, res) => {
  try {
    const userId = getUserId(req);
    const { liked = [], skipped = [] } = req.body;

    logger.info("Set preferences request", { userId, likedCount: liked.length, skippedCount: skipped.length });

    const user = await User.findById(userId);
    if (!user) {
      logger.warn("User not found when setting preferences", { userId });
      return res.status(404).json({ error: "User not found" });
    }

    user.liked = liked;
    user.skipped = skipped;
    await user.save();

    logger.info("Preferences updated", { userId, likedCount: liked.length, skippedCount: skipped.length });
    res.json({ liked: user.liked, skipped: user.skipped });
  } catch (err) {
    logger.error("Failed to update preferences", { userId: getUserId(req), error: err instanceof Error ? err.message : err });
    res.status(500).json({ error: "Failed to merge preferences" });
  }
});

router.get("/me/preferences", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(getUserId(req)).populate("liked").populate("skipped");

    logger.info("Fetched user preferences", { userId: getUserId(req) });
    res.json({ liked: user?.liked || [], skipped: user?.skipped || [] });
  } catch (err) {
    logger.error("Failed to fetch preferences", { userId: getUserId(req), error: err instanceof Error ? err.message : err });
    res.status(500).json({ error: "Failed to fetch preferences" });
  }
});

export default router;
