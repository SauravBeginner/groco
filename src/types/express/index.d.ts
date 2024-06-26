// types/express/index.d.ts

import { Request } from "express";
import { Role } from "@prisma/client";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      userId: string;
      role: Role;
      // Add other user properties here if needed
    };
  }
}
