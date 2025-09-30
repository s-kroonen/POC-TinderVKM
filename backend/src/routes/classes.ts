import { Router } from "express";
import Class from "../models/Class.js";
import User from "../models/Users.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

// Get all classes
router.get("/", async (_req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch classes" });
  }
});

// Get a single class by ID
router.get("/:id", async (req, res) => {
  try {
    const classItem = await Class.findOne({ id: Number(req.params.id) });
    if (!classItem) return res.status(404).json({ error: "Class not found" });
    res.json(classItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch class" });
  }
});


router.post("/me/set-preferences", authMiddleware, async (req, res) => {
  try {
    const userId = req.user!.id;
    const { liked = [], skipped = [] } = req.body;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    // Set arrays: overwrite existing
    user.liked = liked;
    user.skipped = skipped;

    await user.save();

    res.json({ liked: user.liked, skipped: user.skipped });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to merge preferences" });
  }
});

// Fetch liked/skipped for logged-in user
router.get("/me/preferences", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user!.id)
      .populate("liked")
      .populate("skipped");
    res.json({ liked: user?.liked || [], skipped: user?.skipped || [] });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch preferences" });
  }
});


export default router;
