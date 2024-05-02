import cookieparser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import addressRouter from "./routes/addressRoutes";
import orderRouter from "./routes/orderRoutes";
import paymentRouter from "./routes/paymentRoutes";
import productRouter from "./routes/productRoutes";
import reviewRouter from "./routes/reviewRoutes";
import sellerRouter from "./routes/sellerRoutes";
import userRouter from "./routes/userRoutes";
import { CustomError } from "./types/customError";
dotenv.config();

mongoose
  .connect(process.env.DB_URI || "enterYourDBURI", { dbName: "MarketPlace" })
  .then(() => console.log("MongoDB connected new"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieparser());

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/review", reviewRouter);
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3003, () => {
  console.log("server started");
});
