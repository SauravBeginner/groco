"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
// Multer configuration for file uploads on disk
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp"); // Save files in this directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Save files with their original names
    },
});
exports.upload = (0, multer_1.default)({ storage });
