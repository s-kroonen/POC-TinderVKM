import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { UserRepository } from "../../infra/mongoose/repositories/UserRepository.js";
import { UserService } from "../../services/userService.js";

const router = Router();

const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const authController = new AuthController(userService);

router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));

router.get("/microsoft", (req, res, next) => authController.microsoftLogin(req, res, next));
router.get("/microsoft/callback", (req, res, next) => authController.microsoftCallback(req, res, next));

export default router;
