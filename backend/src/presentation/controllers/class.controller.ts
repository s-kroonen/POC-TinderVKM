import { Request, Response } from "express";
import { ClassService } from "../../services/classService.js";
import logger from "../../utils/logger.js";

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
    async create(req: Request, res: Response) {
        try {
            const created = await this.classService.create(req.body);
            res.status(201).json(created);
        } catch (err: any) {
            res.status(err.status ?? 400).json({ errors: err.errors ?? err.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const updated = await this.classService.update(id, req.body);
            if (!updated) return res.status(404).json({ error: "Class not found" });
            res.json(updated);
        } catch (err: any) {
            res.status(err.status ?? 400).json({ errors: err.errors ?? err.message });
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const deleted = await this.classService.remove(id);
            if (!deleted) return res.status(404).json({ error: "Class not found" });
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: "Delete failed" });
        }
    }

}
