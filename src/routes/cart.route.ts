import { Router } from "express";
import {
  addToCart,
  cartItemDelete,
  cartItemUpdate,
  clearUserCart,
  getUserCart,
} from "../controllers/cart.controller";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.get("/get", authenticateJWT, getUserCart);
router.post("/add", authenticateJWT, addToCart);
router.patch("/update", authenticateJWT, cartItemUpdate);
router.delete("/delete", authenticateJWT, cartItemDelete);
router.delete("/clear-cart", authenticateJWT, clearUserCart);

export default router;
