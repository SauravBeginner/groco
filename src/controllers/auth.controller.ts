import { signinInput, signupInput } from "@10xcoder/groco-common";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { base_URL } from "../utils/jwt";
import nodemailer from "nodemailer";
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const emailCredentials = "techx100x@gmail.com";
const passCredentials = "Tech10x@712103";
const transporter = nodemailer.createTransport({
  pool: true,
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use TLS
  auth: { user: emailCredentials, pass: passCredentials },
});
export const signup = async (req: Request, res: Response) => {
  const { success } = signupInput.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ error: "Invalid request body!" });
  }
  const { name, email, password, role } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const tokens: string = crypto.randomUUID();
  const verificationTokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        // @ts-ignore
        verificationToken: tokens,
        verificationTokenExpiresAt,
        role,
      },
    });
    console.log(`User created!`);
    const verificationLink = `${process.env.PROD_SERVER_URL}/verify/${tokens}`;

    // await transporter.sendMail({
    //   from: '"Groco 👻" <no-reply@groco.email>', // sender address
    //   to: email, // list of receivers
    //   subject: "Verify your email ✔", // Subject line
    //   text: `Click on the following link to verify your email: ${verificationLink}`,
    //   //  html: "<b>Hello world?</b>", // html body
    // });

    const mailOptions = {
      from: '"Groco 👻" <no-reply@groco.email>', // sender address
      to: email, // list of receivers
      subject: "Verify your email ✔", // Subject line
      text: `Click on the following link to verify your email: ${verificationLink}`,
      //  html: "<b>Hello world?</b>", // html body
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) return console.log(err);
      // console.log(info);
      return res.status(201).json({
        message:
          "User registered, please check your email for verification link",
      });
    });
    // res.status(201).json({
    //   message: "User registered, please check your email for verification link",
    // });
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
