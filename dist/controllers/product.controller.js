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
exports.addProduct = void 0;
const groco_common_1 = require("@10xcoder/groco-common");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = groco_common_1.createProductInput.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ error: "Invalid request body!" });
    }
    const { name, description, price, thumbNail, countInStock, category } = req.body;
    try {
        const product = yield prisma.product.create({
            data: {
                name,
                description,
                price,
                thumbNail,
                countInStock,
                category,
            },
        });
        return res.status(201).json({
            message: "Category created successfully",
            product,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Something went wrong!",
        });
    }
});
exports.addProduct = addProduct;
