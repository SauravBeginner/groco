"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileDetails = exports.getUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.status(201).json({
            message: "All Users fetched successfully",
            users,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Something went wrong!",
        });
    }
});
exports.getUsers = getUsers;
const getProfileDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
            },
        });
        return res.status(201).json({
            message: "Profile details fetched successfully",
            user,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Something went wrong!",
        });
    }
});
exports.getProfileDetails = getProfileDetails;
