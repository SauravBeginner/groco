import { Router } from "express";
import {
  addToCart,
  cartItemDelete,
  cartItemUpdate,
  getUserCart,
} from "../controllers/cart.controller";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.get("/get", authenticateJWT, getUserCart);
router.post("/add", authenticateJWT, addToCart);
router.patch("/update", authenticateJWT, cartItemUpdate);
router.delete("/delte", authenticateJWT, cartItemDelete);

export default router;
