// src/controllers/UserController.ts
import { Request, Response } from "express";
import logger from "../../utils/logger.js";
import { UserService } from "../../services/userService.js";

export class UserController {
    constructor(private userService: UserService) { }

    setPreferences = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.findById((req.user as { id: string }).id);
            if (!user) return res.status(404).json({ error: "User not found" });

            const { liked = [], skipped = [] } = req.body;
            user.liked = liked;
            user.skipped = skipped;

            await this.userService.save(user as any);

            res.json({ liked: user.liked, skipped: user.skipped });
        } catch (err) {
            logger.error("Failed to set preferences", {
                error: err instanceof Error ? err.message : err
            });
            res.status(500).json({ error: "Failed to merge preferences" });
        }
    };

    getPreferences = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.findById((req.user as { id: string }).id);
            if (!user) return res.status(404).json({ error: "User not found" });

            await user.populate("liked");
            await user.populate("skipped");

            res.json({ liked: user.liked || [], skipped: user.skipped || [] });
        } catch (err) {
            logger.error("Failed to get preferences", {
                error: err instanceof Error ? err.message : err
            });
            res.status(500).json({ error: "Failed to fetch preferences" });
        }
    };
}


