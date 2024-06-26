import { Router } from "express";
import { getProfileDetails, getUsers } from "../controllers/user.controller";
import { authAdmin, authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

// router.get("/bulk", authenticateJWT, authAdmin, getUsers);
router.get("/bulk", getUsers);
router.get("/profile-details", authenticateJWT, getProfileDetails);

export default router;
