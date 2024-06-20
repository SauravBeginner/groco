import { Router } from "express";

import authRoute from "./auth.route";
import categoryRoute from "./category.route";
import productRoute from "./product.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/category", categoryRoute);
router.use("/product", productRoute);

export default router;