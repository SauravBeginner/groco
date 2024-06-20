import { signinInput, signupInput } from "@10xcoder/groco-common";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const signup = async (req: Request, res: Response) => {
  const { success } = signupInput.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ error: "Invalid request body!" });
  }
  const { name, email, password, role } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return res.status(201).json({ user });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error!" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { success } = signinInput.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ error: "Invalid request body!" });
  }

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true });

    const { password: _, ...userDetails } = user;
    return res.status(200).json({ user: userDetails, token });

    // return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error!" });
  }
};
