import { createCategoryInput } from "@10xcoder/groco-common";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
export const addCategory = async (req: Request, res: Response) => {
  const { success } = createCategoryInput.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ error: "Invalid request body!" });
  }
  const { name } = req.body;
  //@ts-ignore
  const userId = req.user?.userId;
  try {
    const category = await prisma.category.create({
      data: {
        name,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};
