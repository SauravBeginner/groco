import { createProductInput } from "@10xcoder/groco-common";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { deleteCloudinary, uploadCloudinary } from "../utils/cloudinary";

const prisma = new PrismaClient();
export const addProduct = async (req: Request, res: Response) => {
  // const { success } = createProductInput.safeParse(req.body);

  // if (!success) {
  //   return res.status(400).json({ error: "Invalid request body!" });
  // }

  const thumbNailPath = req.file?.path;

  if (!thumbNailPath)
    return res.status(400).json({ error: "Thumbnail file is required!" });
  const { name, description, price, countInStock, categoryId } = req.body;

  const userId = req.user?.userId;
  try {
    const thumbNailUpload = await uploadCloudinary(thumbNailPath);
    if (!thumbNailUpload)
      return res
        .status(400)
        .json({ error: "Thumbnail file upload not successfull!" });

    const product = await prisma.product.create({
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

export const editProduct = async (req: Request, res: Response) => {
  // const { success } = createProductInput.safeParse(req.body);

  // if (!success) {
  //   return res.status(400).json({ error: "Invalid request body!" });
  // }

  const productId = req.params.id;
  const thumbNailPath = req.file?.path;

  const userId = req.user?.userId;
  const { name, description, price, countInStock, categoryId } = req.body;

  try {
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found!" });
    }

    let thumbNailUrl = existingProduct.thumbNail;

    if (thumbNailPath) {
      const thumbNailUpload = await uploadCloudinary(thumbNailPath);

      if (!thumbNailUpload)
        return res
          .status(400)
          .json({ error: "Thumbnail file upload not successfull!" });

      const prevThumbNailUrl = existingProduct.thumbNail;

      const prevFileId = prevThumbNailUrl?.split("/").pop()?.split(".")[0];

      await deleteCloudinary(prevFileId || "");
      thumbNailUrl = thumbNailUpload?.url;
    }

    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name: name || existingProduct?.name,
        description: description || existingProduct?.description,
        price: price || existingProduct?.price,
        thumbNail: thumbNailUrl || existingProduct?.thumbNail,
        countInStock: countInStock || existingProduct?.countInStock,

        category: {
          connect: {
            id: categoryId || existingProduct?.categoryId,
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(201).json({
      message: "All Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

export const getProductDetails = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  try {
    const product = await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    return res.status(200).json({
      message: "Product deleted successfully",
      productId: product.id,
    });
  } catch (error: any) {
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
};
