import { signinInput, signupInput } from "@10xcoder/groco-common";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { base_URL, client_URL } from "../utils/jwt";
import nodemailer from "nodemailer";
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "della.bogan@ethereal.email",
    pass: "wxHwAJcFH5sctUhu2k",
  },
});

export const signup = async (req: Request, res: Response) => {
  const { success } = signupInput.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ error: "Invalid request body!" });
  }

  try {
    const { name, email, password, role } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const token: string = crypto.randomUUID();
    const verificationTokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        // @ts-ignore
        verificationToken: token,
        verificationTokenExpiresAt,
        role,
      },
    });
    console.log(`User created!`);
    const verificationLink = `${client_URL}/verify/${token}`;

    const mailOptions = {
      from: '"Groco 👻" <no-reply@groco.email>', // sender address
      to: email, // list of receivers
      subject: "Verify your email ✔", // Subject line
      text: `Click on the following link to verify your email: ${verificationLink}`,
      html: `<b>Click on the following link to verify your email:<a href="${verificationLink}">${verificationLink}</a></b></b>`, // html body
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) return console.log(err);
      // console.log(info);
      return res.status(201).json({
        message:
          "User registered, please check your email for verification link",
      });
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error!" });
  }
};

export const verify = async (req: Request, res: Response) => {
  const { token } = req.params;
  try {
    const user = await prisma.user.findFirst({
      where: {
        // @ts-ignore
        verificationToken: token,
      },
    });

    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "Invalid Token!" });
    }

    // @ts-ignore
    if (user?.isVerified) {
      return res.status(400).json({ error: "User already verified!" });
    }

    // @ts-ignore
    if (user?.verificationTokenExpiresAt < new Date()) {
      await prisma.user.delete({ where: { id: user.id } });
      return res.status(403).json({ error: "Verification link expired!" });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        // verificationToken: null,
        // verificationTokenExpiresAt: null,
        // @ts-ignore
        isVerified: true,
      },
    });
    return res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.log(error);
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
