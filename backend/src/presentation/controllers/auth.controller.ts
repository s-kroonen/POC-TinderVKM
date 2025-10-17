import { Request, Response } from "express";
import { UserService } from "../../services/userService";
import logger from "../../utils/logger";
import { signToken } from "../../utils/jwt";
import validator from "validator";
import passport from "passport";

export class AuthController {
    constructor(private userService: UserService) { }

    async register(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            // Basic validation
            if (!email || !validator.isEmail(email)) {
                return res.status(400).json({ error: "Invalid email address" });
            }
            if (!password || password.length < 6) {
                return res.status(400).json({ error: "Password must be at least 6 characters" });
            }

            // Check duplicate email
            const existingUser = await this.userService.findByEmail(email);
            if (existingUser) {
                return res.status(409).json({ error: "Email already in use" });
            }

            const user = await this.userService.register(email, password);
            logger.info("User registered", { userId: user._id, email });
            res.status(201).json(user);
        } catch (err) {
            logger.error("Register failed", { error: err instanceof Error ? err.message : err });
            res.status(500).json({ error: "Registration failed" });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            // Validation
            if (!email || !validator.isEmail(email)) {
                return res.status(400).json({ error: "Invalid email address" });
            }
            if (!password) {
                return res.status(400).json({ error: "Password is required" });
            }

            const user = await this.userService.findByEmail(email);
            if (!user) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            const bcrypt = await import("bcrypt");
            const valid = user.password ? await bcrypt.compare(password, user.password) : false;

            if (!valid) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            const token = signToken({ id: user._id });
            logger.info("User login successful", { userId: user._id, email });
            res.json({ token });
        } catch (err) {
            logger.error("Login error", { error: err instanceof Error ? err.message : err });
            res.status(500).json({ error: "Login failed" });
        }
    }
    microsoftLogin(req: Request, res: Response, next: Function) {
        passport.authenticate("microsoft")(req, res, next);
    }

    microsoftCallback(req: Request, res: Response, next: Function) {
        logger.info("Microsoft callback query", { query: req.query });

        passport.authenticate("microsoft", (err: any, user: any, info: any) => {
            if (err) {
                logger.error("Microsoft OAuth error", { error: err });
                return res.status(500).send(`<pre>OAuth Error: ${JSON.stringify(err, null, 2)}</pre>`);
            }

            if (!user) {
                logger.warn("Microsoft OAuth failed", { info });
                return res.status(401).send(`<pre>OAuth Failed: ${JSON.stringify(info, null, 2)}</pre>`);
            }
            const token = signToken({ id: user._id });

            logger.info("Microsoft OAuth success", { userId: user._id, email: user.email });

            const frontendOrigin = process.env.FRONTEND_URL || "http://localhost:5173";
            res.send(`
        <script>
          window.opener.postMessage(
            { token: '${token}', user: { email: '${user.email}' } },
            '${frontendOrigin}'
          );
          window.close();
        </script>
      `);
        })(req, res, next);
    }
}
