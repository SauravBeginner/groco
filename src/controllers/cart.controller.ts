// Get the user's cart

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import { base_URL, client_URL } from "../utils/jwt";
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const getUserCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const cart = await prisma.cart.findFirst({
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user?.userId;

    let cart = await prisma.cart.findFirst({
      where: {
        userId,
      },
    });

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
        },
      });
    }

    const cartItem = await prisma.cartItem.upsert({
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

export const cartItemUpdate = async (req: Request, res: Response) => {
  try {
    const { itemId, quantity } = req.body;
    const userId = req.user?.userId;

    const cartItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });
    return res.status(201).json({
      messgae: "Cart Item updated successfully!",
      cartItem,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

export const cartItemDelete = async (req: Request, res: Response) => {
  try {
    const { itemId, quantity } = req.body;
    const userId = req.user?.userId;

    const cartItem = await prisma.cartItem.delete({
      where: { id: itemId },
    });
    return res.status(201).json({
      messgae: "Cart Item deleted successfully!",
      cartItem,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};
