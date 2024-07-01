// Get the user's cart

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

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
    const totalPrice = cart.items.reduce(
      (total, item) =>
        total + parseFloat(item?.product?.price) * item?.quantity,
      0
    );
    const totalQuantity = cart.items.reduce(
      (total, item) => total + item?.quantity,
      0
    );
    return res.status(200).json({
      messgae: "Cart fetched successfully!",
      cart,
      totalPrice,
      totalQuantity,
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
    const { itemId, productId, quantity } = req.body;
    // const userId = req.user?.userId;

    const cartItem = await prisma.cartItem.update({
      where: { id: itemId, productId },
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
    const { itemId } = req.body;
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

export const clearUserCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const cart = await prisma.cart.findFirst({
      where: {
        userId,
      },
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    await prisma.cartItem.deleteMany({
      where: { cartId: cart?.id },
    });
    return res.status(201).json({
      messgae: "Cart cleared successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};
