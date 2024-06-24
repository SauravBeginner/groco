import { Router } from "express";
import { getUsers } from "../controllers/user.controller";
import { authAdmin, authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

// router.get("/bulk", authenticateJWT, authAdmin, getUsers);
router.get("/bulk", getUsers);

export default router;
