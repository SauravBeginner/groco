import { Router } from "express";
import { addCategory } from "../controllers/category.controller";
import { authAdmin, authenticateJWT } from "../middleware/authMiddleware";
import {
  addProduct,
  getProductDetails,
  getProducts,
} from "../controllers/product.controller";
import { upload } from "../middleware/uploadMiddleware";

const router = Router();

router.post(
  "/create",
  authenticateJWT,
  authAdmin,
  upload.single("thumbNail"),
  addProduct
);
router.get("/products", getProducts);
router.get("/product-details/:id", getProductDetails);

export default router;
