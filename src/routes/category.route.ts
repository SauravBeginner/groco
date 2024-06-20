import { Router } from "express";
import { addCategory } from "../controllers/category.controller";
import { authAdmin, authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.post("/create", authenticateJWT, authAdmin, addCategory);

export default router;
