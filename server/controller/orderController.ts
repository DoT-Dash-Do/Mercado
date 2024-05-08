import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import OrderModel from "../models/order";
import ProductModel from "../models/product";
import SellerModel from "../models/seller";
import UserModel from "../models/user";
import { errorHandler } from "../utils/error";
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
      const newOrder = new OrderModel({
        address: address,
        product: user.cart[i].product,
        seller: product.seller._id,
        quantity: user.cart[i].quantity,
        user: decoded,
        order_id: order_id,
        totalPrice: Number(product.price * user.cart[i].quantity),
        status: "Payment Processing",
      });
      await newOrder.save();
    }
    await UserModel.findByIdAndUpdate(
      decoded,
      {
        cart: [],
      },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "Saved Order successfully",
    });
  } catch (err) {
    console.log(err);
    return next(errorHandler(501, "Unauthorized access"));
  }
};
export const placeOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, order_id, update_id } = req.body;

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

    const order = await OrderModel.find({ user: decoded, order_id: update_id });
    for (let i = order.length - 1; i >= 0; i--) {
      if (order[i].status === "Payment Processing") {
        await OrderModel.findByIdAndUpdate(
          order[i]._id,
          {
            order_id,
            status: "order placed",
          },
          { new: true }
        );
        const seller: any = await SellerModel.findById(order[i].seller._id);
        await SellerModel.findByIdAndUpdate(
          order[i].seller._id,
          {
            balance: seller.balance + order[i].totalPrice,
          },
          { new: true }
        );
        const product: any = await ProductModel.findById(order[i].product._id);
        await ProductModel.findByIdAndUpdate(
          order[i].product._id,
          {
            soldStock: product.soldStock + order[i].quantity,
            stock: product.stock - order[i].quantity,
          },
          { new: true }
        );
      }
    }
    res.status(201).json({
      success: true,
      message: "Saved Order successfully",
    });
  } catch (err) {
    console.log(err);
    return next(errorHandler(501, "Unauthorized access"));
  }
};

export const failedOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, update_id } = req.body;

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

    const order = await OrderModel.find({ user: decoded, order_id: update_id });
    for (let i = order.length - 1; i >= 0; i--) {
      if (order[i].status === "Payment Processing") {
        await OrderModel.findByIdAndUpdate(
          order[i]._id,
          {
            status: "payment failed",
          },
          { new: true }
        );
      }
    }
    res.status(201).json({
      success: true,
      message: "order failed to place",
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

    const orders = await OrderModel.find({ user }).populate("product");

    const sentOrders = orders.filter((order) => {
      return order?.status !== "Payment Processing";
    });

    return res.status(201).json({ orders: sentOrders });
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

export const displayOrderOfSeller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body;
  try {
    const seller = jwt.verify(
      token,
      process.env.JWT_SECRET || "haklabaBuptis",
      (err: any, data: any) => {
        if (err) return undefined;
        else return data.id;
      }
    );

    if (seller === undefined) {
      return next(errorHandler(501, "Unauthorized Access"));
    }

    const orders = await OrderModel.find({ seller }).populate("product");

    res.status(201).json({ orders });
  } catch (err) {
    return next(errorHandler(501, "Unauthorized Access"));
  }
};

export const changeOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, order, changeStatus } = req.body;

  try {
    const seller = jwt.verify(
      token,
      process.env.JWT_SECRET || "haklabaBuptis",
      (err: any, data: any) => {
        if (err) return undefined;
        else return data.id;
      }
    );

    if (seller === undefined) {
      return next(errorHandler(501, "Unauthorized Access"));
    }

    await OrderModel.findByIdAndUpdate(
      { _id: order },
      { status: changeStatus },
      { new: true }
    );

    return res.status(201).json({ message: "Successfully Updated" });
  } catch (err) {
    return next(errorHandler(501, "Could not complete the request"));
  }
};
