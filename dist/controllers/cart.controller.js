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
exports.clearUserCart = exports.cartItemDelete = exports.cartItemUpdate = exports.addToCart = exports.getUserCart = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUserCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
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
        const totalPrice = (_b = cart === null || cart === void 0 ? void 0 : cart.items) === null || _b === void 0 ? void 0 : _b.reduce((total, item) => { var _a; return total + parseFloat((_a = item === null || item === void 0 ? void 0 : item.product) === null || _a === void 0 ? void 0 : _a.price) * (item === null || item === void 0 ? void 0 : item.quantity); }, 0);
        const totalQuantity = (_c = cart === null || cart === void 0 ? void 0 : cart.items) === null || _c === void 0 ? void 0 : _c.reduce((total, item) => total + (item === null || item === void 0 ? void 0 : item.quantity), 0);
        return res.status(200).json({
            messgae: "Cart fetched successfully!",
            cart,
            totalPrice,
            totalQuantity,
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
    var _d;
    try {
        const { productId, quantity } = req.body;
        const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.userId;
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
    try {
        const { itemId, productId, quantity } = req.body;
        // const userId = req.user?.userId;
        const cartItem = yield prisma.cartItem.update({
            where: { id: itemId, productId },
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
    var _e;
    try {
        const { itemId } = req.body;
        const userId = (_e = req.user) === null || _e === void 0 ? void 0 : _e.userId;
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
const clearUserCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const userId = (_f = req.user) === null || _f === void 0 ? void 0 : _f.userId;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const cart = yield prisma.cart.findFirst({
            where: {
                userId,
            },
        });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }
        yield prisma.cartItem.deleteMany({
            where: { cartId: cart === null || cart === void 0 ? void 0 : cart.id },
        });
        return res.status(201).json({
            messgae: "Cart cleared successfully!",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Something went wrong!",
        });
    }
});
exports.clearUserCart = clearUserCart;
