import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

interface DecodeToken extends JwtPayload {
  userId: string;
  role: Role;
  iat: number;
  exp: number;
}

interface ExtendedRequest extends Request {
  user?: DecodeToken;
}
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers?.authorization;

    const token = req.cookies.token || authHeader?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ error: "Unauthorized!" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as DecodeToken;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid Acess Token!" });
  }
};

export const authAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ error: "You are not admin!" });
    }
    next();
  } catch (error) {
    return res.status(404).json({ error: "Unauthorized!" });
  }
};
