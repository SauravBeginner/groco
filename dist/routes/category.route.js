"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post("/create", authMiddleware_1.authenticateJWT, authMiddleware_1.authAdmin, category_controller_1.addCategory);
exports.default = router;
