"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const product_controller_1 = require("../controllers/product.controller");
const router = (0, express_1.Router)();
router.post("/create", authMiddleware_1.authenticateJWT, authMiddleware_1.authAdmin, product_controller_1.addProduct);
exports.default = router;
