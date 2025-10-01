// routes/auth.ts
import { Router } from "express";
import passport from "passport";
import "../passport.js";
import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.info("Register request received", { email });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash });

    logger.info("User registered successfully", { userId: user._id, email });
    res.json(user);
  } catch (err) {
    logger.error("User registration failed", {
      body: req.body,
      error: err instanceof Error ? err.message : err,
    });
    res.status(400).json({ error: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  logger.info("Login attempt", { email });

  const user = await User.findOne({ email });
  if (!user) {
    logger.warn("Login failed - user not found", { email });
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    logger.warn("Login failed - invalid password", { email, userId: user._id });
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret");
  logger.info("Login successful", { userId: user._id, email });
  res.json({ token });
});

// Redirect user to Microsoft login
router.get("/microsoft", passport.authenticate("microsoft"));

// Callback after Microsoft login
router.get(
  "/microsoft/callback",
  (req, res, next) => {
    console.log("Microsoft callback query:", req.query);

    passport.authenticate("microsoft", (err: any, user: any, info: any) => {
      if (err) {
        console.error("Microsoft OAuth Error:", err);
        return res
          .status(500)
          .send(`<pre>OAuth Error: ${JSON.stringify(err, null, 2)}</pre>`);
      }

      if (!user) {
        console.warn("Microsoft OAuth failed:", info);
        return res
          .status(401)
          .send(`<pre>OAuth Failed: ${JSON.stringify(info, null, 2)}</pre>`);
      }

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || "secret"
      );
      console.log("OAuth success, sending JWT to opener:", user.email, token);

      const frontendOrigin = process.env.FRONTEND_URL || "http://localhost:5173";
      console.log("Using frontend origin:", frontendOrigin);
      res.send(`
        <script>
          console.log("Posting token to opener:", '${token}');
          window.opener.postMessage(
            { token: '${token}', user: { email: '${user.email}' } },
            '${frontendOrigin}'
          );
          window.close();
        </script>
      `);

    })(req, res, next);
  }
);




export default router;
