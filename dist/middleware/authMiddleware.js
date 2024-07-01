"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAdmin = exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const authenticateJWT = (req, res, next) => {
    var _a, _b;
    try {
        const authHeader = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        const token = ((_b = req === null || req === void 0 ? void 0 : req.cookies) === null || _b === void 0 ? void 0 : _b.token) || (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1]);
        if (!token) {
            return res.status(403).json({ error: "Unauthorized!" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Invalid Acess Token!" });
    }
};
exports.authenticateJWT = authenticateJWT;
const authAdmin = (req, res, next) => {
    var _a;
    try {
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "admin") {
            return res.status(403).json({ error: "You are not admin!" });
        }
        next();
    }
    catch (error) {
        return res.status(404).json({ error: "Unauthorized!" });
    }
};
exports.authAdmin = authAdmin;
