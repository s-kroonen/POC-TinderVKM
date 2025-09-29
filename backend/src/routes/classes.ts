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

// Like a class (authenticated)
router.post("/:id/like", authMiddleware, async (req, res) => {
  try {
    const userId = req.user!.id;
    const classId = req.params.id;

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { liked: classId }, $pull: { skipped: classId } }, // add to liked, remove from skipped
      { new: true }
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to like class" });
  }
});

// Skip a class (authenticated)
router.post("/:id/skip", authMiddleware, async (req, res) => {
  try {
    const userId = req.user!.id;
    const classId = req.params.id;

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { skipped: classId }, $pull: { liked: classId } }, // add to skipped, remove from liked
      { new: true }
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to skip class" });
  }
});
router.post("/merge-preferences", authMiddleware, async (req, res) => {
  try {
    const userId = req.user!.id;
    const { liked = [], skipped = [] } = req.body;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    // Merge arrays: keep uniqueness
    user.liked = Array.from(new Set([...user.liked.map(String), ...liked]));
    user.skipped = Array.from(new Set([...user.skipped.map(String), ...skipped]));

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
