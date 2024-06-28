import { Router } from "express";
import { login, logout, signup, verify } from "../controllers/auth.controller";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify/:token", verify);
router.post("/logout", authenticateJWT, logout);

export default router;
