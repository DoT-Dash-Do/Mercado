import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import OrderModel from "../models/order";
import UserModel from "../models/user";
import ProductModel from "../models/product";
import { errorHandler } from "../utils/error";
import SellerModel from "../models/seller";
dotenv.config();

// recieve array from req.body
export const addOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, address, order_id } = req.body;

  try {
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET || "haklabaBuptis",
      (err: any, result: any) => {
        if (err) return undefined;
        return result.id;
      }
    );

    if (decoded === undefined) {
      return next(errorHandler(501, "Unauthorized access"));
    }
    const user: any = await UserModel.findById(decoded).select("cart").exec();
    for (let i = user.cart.length - 1; i >= 0; i--) {
      const product: any = await ProductModel.findById(user.cart[i].product);
      const seller: any = await SellerModel.findById(product.seller._id);
      await SellerModel.findByIdAndUpdate(product.seller._id, {
        balance: seller.balance + (user.cart[i].quantity * product.price)},
        {new:true});
      await ProductModel.findByIdAndUpdate(user.cart[i].product,
        {
          soldStock:product.soldStock + user.cart[i].quantity,
          stock:product.stock - user.cart[i].quantity,
        },{new:true}
      );
      const newOrder = new OrderModel({
        address:address,
        product: user.cart[i].product,
        seller:product.seller._id,
        quantity: user.cart[i].quantity,
        user: decoded,
        order_id:order_id,
        totalPrice:Number(product.price*user.cart[i].quantity),
        status:"Order placed"
      });
      await newOrder.save();
    }
    await UserModel.findByIdAndUpdate(decoded,{
      cart:[]
    },{new:true});
    res.status(201).json({
      success: true,
      message: "Saved Order successfully",
    });
  } catch (err) {
    console.log(err);
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
