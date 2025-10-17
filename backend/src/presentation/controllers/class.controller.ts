import { Request, Response } from "express";
import { ClassService } from "../../services/classService";
import logger from "../../utils/logger";

export class ClassController {
    constructor(private classService: ClassService) { }
    async getAll(_req: Request, res: Response) {
        try {
            const classes = await this.classService.getAll();
            res.json(classes);
        } catch (err) {
            logger.error("Get classes failed %o", err);
            res.status(500).json({ error: "Failed to fetch classes" });
        }
    }
    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const item = await this.classService.getByIdNumber(id);
            if (!item) return res.status(404).json({ error: "Class not found" });
            res.json(item);
        } catch (err) {
            logger.error("Get class failed %o", err);
            res.status(500).json({ error: "Failed to fetch class" });
        }
    }
}
