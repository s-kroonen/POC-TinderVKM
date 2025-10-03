import { Router } from "express";
import { UserController } from "../controllers/userController.js";
import { ClassController } from "../controllers/class.controller.js";
import { ClassRepository } from "../../infra/mongoose/repositories/ClassRepository.js";
import { ClassService } from "../../services/classService.js";
import authMiddleware from "../../middleware/auth.js";
import { UserService } from "../../services/userService.js";
import { UserRepository } from "../../infra/mongoose/repositories/UserRepository.js";
const router = Router();

const UserRepo = new UserRepository();
const userService = new UserService(UserRepo);
const userController = new UserController(userService);

router.post("/me/set-preferences", authMiddleware, userController.setPreferences.bind(userController));
router.get("/me/preferences", authMiddleware, userController.getPreferences.bind(userController));

const classRepo = new ClassRepository();
const classService = new ClassService(classRepo);
const classController = new ClassController(classService);

router.get("/", classController.getAll.bind(classController));
router.get("/:id", classController.getById.bind(classController));

export default router;