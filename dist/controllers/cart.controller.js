"use strict";
// Get the user's cart
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
exports.cartItemDelete = exports.cartItemUpdate = exports.addToCart = exports.getUserCart = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const getUserCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const cart = yield prisma.cart.findFirst({
            where: {
                userId: userId,
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        if (!cart) {
            return res.status(404).json({
                message: "Cart not found!",
            });
        }
        return res.status(200).json({
            messgae: "Cart fetched successfully!",
            cart,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Something went wrong!",
        });
    }
});
exports.getUserCart = getUserCart;
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { productId, quantity } = req.body;
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId;
        let cart = yield prisma.cart.findFirst({
            where: {
                userId,
            },
        });
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        if (!cart) {
            cart = yield prisma.cart.create({
                data: {
                    userId,
                },
            });
        }
        const cartItem = yield prisma.cartItem.upsert({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId,
                },
            },
            update: {
                quantity: { increment: quantity },
            },
            create: {
                cartId: cart.id,
                productId,
                quantity,
            },
        });
        return res.status(201).json({
            messgae: "Cart Item added successfully!",
            cart,
            cartItem,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Something went wrong!",
        });
    }
});
exports.addToCart = addToCart;
const cartItemUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { itemId, quantity } = req.body;
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId;
        const cartItem = yield prisma.cartItem.update({
            where: { id: itemId },
            data: { quantity },
        });
        return res.status(201).json({
            messgae: "Cart Item updated successfully!",
            cartItem,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Something went wrong!",
        });
    }
});
exports.cartItemUpdate = cartItemUpdate;
const cartItemDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const { itemId, quantity } = req.body;
        const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.userId;
        const cartItem = yield prisma.cartItem.delete({
            where: { id: itemId },
        });
        return res.status(201).json({
            messgae: "Cart Item deleted successfully!",
            cartItem,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Something went wrong!",
        });
    }
});
exports.cartItemDelete = cartItemDelete;
