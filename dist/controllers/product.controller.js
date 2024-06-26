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
exports.deleteProduct = exports.getProductDetails = exports.getProducts = exports.editProduct = exports.addProduct = void 0;
const client_1 = require("@prisma/client");
const cloudinary_1 = require("../utils/cloudinary");
const prisma = new client_1.PrismaClient();
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { success } = createProductInput.safeParse(req.body);
    var _a, _b;
    // if (!success) {
    //   return res.status(400).json({ error: "Invalid request body!" });
    // }
    const thumbNailPath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    if (!thumbNailPath)
        return res.status(400).json({ error: "Thumbnail file is required!" });
    const { name, description, price, countInStock, categoryId } = req.body;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId;
    try {
        const thumbNailUpload = yield (0, cloudinary_1.uploadCloudinary)(thumbNailPath);
        if (!thumbNailUpload)
            return res
                .status(400)
                .json({ error: "Thumbnail file upload not successfull!" });
        const product = yield prisma.product.create({
            data: {
                name,
                description,
                price,
                thumbNail: thumbNailUpload.url,
                countInStock: parseInt(countInStock),
                category: {
                    connect: {
                        id: categoryId,
                    },
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        return res.status(201).json({
            message: "Product created successfully",
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
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { success } = createProductInput.safeParse(req.body);
    var _c, _d, _e;
    // if (!success) {
    //   return res.status(400).json({ error: "Invalid request body!" });
    // }
    const productId = req.params.id;
    const thumbNailPath = (_c = req.file) === null || _c === void 0 ? void 0 : _c.path;
    const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.userId;
    const { name, description, price, countInStock, categoryId } = req.body;
    try {
        const existingProduct = yield prisma.product.findUnique({
            where: {
                id: productId,
            },
        });
        if (!existingProduct) {
            return res.status(404).json({ error: "Product not found!" });
        }
        let thumbNailUrl = existingProduct.thumbNail;
        if (thumbNailPath) {
            const thumbNailUpload = yield (0, cloudinary_1.uploadCloudinary)(thumbNailPath);
            if (!thumbNailUpload)
                return res
                    .status(400)
                    .json({ error: "Thumbnail file upload not successfull!" });
            const prevThumbNailUrl = existingProduct.thumbNail;
            const prevFileId = (_e = prevThumbNailUrl === null || prevThumbNailUrl === void 0 ? void 0 : prevThumbNailUrl.split("/").pop()) === null || _e === void 0 ? void 0 : _e.split(".")[0];
            yield (0, cloudinary_1.deleteCloudinary)(prevFileId || "");
            thumbNailUrl = thumbNailUpload === null || thumbNailUpload === void 0 ? void 0 : thumbNailUpload.url;
        }
        const product = yield prisma.product.update({
            where: {
                id: productId,
            },
            data: {
                name: name || (existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.name),
                description: description || (existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.description),
                price: price || (existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.price),
                thumbNail: thumbNailUrl || (existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.thumbNail),
                countInStock: countInStock || (existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.countInStock),
                category: {
                    connect: {
                        id: categoryId || (existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.categoryId),
                    },
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        return res.status(201).json({
            message: "Product edited successfully",
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
exports.editProduct = editProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prisma.product.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.status(201).json({
            message: "All Products fetched successfully",
            products,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Something went wrong!",
        });
    }
});
exports.getProducts = getProducts;
const getProductDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield prisma.product.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!product) {
            return res.status(404).json({
                error: "Product not found!",
            });
        }
        return res.status(200).json({
            message: "Product details fetched successfully",
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
exports.getProductDetails = getProductDetails;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const product = yield prisma.product.delete({
            where: {
                id: productId,
            },
        });
        return res.status(200).json({
            message: "Product deleted successfully",
            productId: product.id,
        });
    }
    catch (error) {
        if (error.code === "P2025") {
            // Prisma specific error code for record not found
            return res.status(404).json({
                error: "Product not found!",
            });
        }
        return res.status(500).json({
            error: "Something went wrong!",
        });
    }
});
exports.deleteProduct = deleteProduct;
