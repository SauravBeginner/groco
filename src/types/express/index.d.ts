// types/express/index.d.ts

import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      userId: string;
      // Add other user properties here if needed
    };
  }
}
