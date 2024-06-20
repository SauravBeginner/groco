import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import rootRouter from "./routes";

const app = express();

const PORT = 5000 || process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://groco-nu.vercel.app",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json("Hello from server!");
});
app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
