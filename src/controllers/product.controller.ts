import { createProductInput } from "@10xcoder/groco-common";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { connect } from "mongoose";
import { uploadCloudinary } from "../utils/cloudinary";

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

  //@ts-ignore
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

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(201).json({
      message: "Product created successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};
