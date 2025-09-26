  import { Router } from "express";
  import Class from "../models/Class.js";
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
    // TODO: implement saving like for user
    res.json({ success: true });
  });

  export default router;
