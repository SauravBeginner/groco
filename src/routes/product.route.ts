import { Router } from "express";
import { authAdmin, authenticateJWT } from "../middleware/authMiddleware";
import {
  addProduct,
  deleteProduct,
  editProduct,
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
router.put("/edit/:id", authenticateJWT, authAdmin, editProduct);
router.delete("/delete/:id", authenticateJWT, authAdmin, deleteProduct);

export default router;
