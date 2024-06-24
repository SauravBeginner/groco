"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
// router.get("/bulk", authenticateJWT, authAdmin, getUsers);
router.get("/bulk", user_controller_1.getUsers);
exports.default = router;
