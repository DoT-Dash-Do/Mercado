import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import OrderModel from "../models/order";
import { errorHandler } from "../utils/error";
dotenv.config();

// recieve array from req.body
export const addOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, address, products, totalPrice } = req.body;

  try {
    const user: any = jwt.verify(
      token,
      process.env.JWT_SECRET || "haklabaBuptis",
      (err: any, result: any) => {
        if (err) return undefined;
        return result.id;
      }
    );

    if (user === undefined) {
      return next(errorHandler(501, "Unauthorized access"));
    }

    const newOrder = new OrderModel({
      address,
      user,
      products,
      totalPrice,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Saved Order successfully",
    });
  } catch (err) {
    return next(errorHandler(501, "Unauthorized access"));
  }
};

export const displayOrderOfUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(
      token,
      process.env.JWT_SECRET || "haklabaBuptis",
      (err: any, data: any) => {
        if (err) return undefined;
        else return data.id;
      }
    );

    if (user === undefined) {
      return next(errorHandler(501, "Unauthorized Access"));
    }

    const orders = await OrderModel.find({ user });

    res.status(201).json({ orders });
  } catch (err) {
    return next(errorHandler(501, "Unauthorized Access"));
  }
};

export const displaySingleOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, orderId } = req.body;

  try {
    const user = jwt.verify(
      token,
      process.env.JWT_SECRET || "haklabaBuptis",
      (err: any, data: any) => {
        if (err) return undefined;
        else return data.id;
      }
    );

    if (user === undefined) {
      return next(errorHandler(501, "Unauthorized Access"));
    }

    const order = await OrderModel.findById({ _id: orderId });

    return res.status(201).json({
      order,
    });
  } catch (err) {
    return next(errorHandler(501, "Unauthorized Access"));
  }
};
