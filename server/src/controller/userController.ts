import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { errorHandler } from "../utils/error";
dotenv.config();

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fieldToUpdate = req.params.field;
    if (req.body.token == undefined)
      return next(errorHandler(401, "unAuthenticated"));

    const decoded = jwt.verify(
      req.body.token,
      process.env.JWT_SECRET || "haklabaBuptis",
      (err: any, result: any) => {
        if (err) return next(errorHandler(403, "forbidden"));
        return result.id;
      }
    );
    if (req.body.updatedField === "") {
      return next(errorHandler(404, "the field cannot be empty"));
    }
    if (fieldToUpdate === "password") {
      const chk = (await User.findById(decoded)) as User;
      const hashChk = bcrypt.compareSync(req.body.oldPassword, chk.password);
      if (!hashChk) {
        return next(errorHandler(403, "Your old password is wrong"));
      }
      req.body.updatedField = bcrypt.hashSync(req.body.updatedField, 10);
    }
    if (fieldToUpdate === "username") {
      const chk = (await User.findOne({
        username: req.body.updatedField,
      })) as User;
      if (chk) {
        if (chk._id == decoded)
          return next(errorHandler(550, "please enter a new username"));
        return next(errorHandler(550, "username already exists"));
      }
    }
    await User.findByIdAndUpdate(
      decoded,
      { [fieldToUpdate]: req.body.updatedField },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "profile updated",
    });
  } catch (error) {
    next(errorHandler(550, "failed to update the user"));
  }
};

export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, product, quantity } = req.body;
  try {
    if (token == undefined) return next(errorHandler(401, "unAuthenticated"));
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "haklabaBuptis",
      (err: any, result: any) => {
        if (err) return next(errorHandler(403, "forbidden"));
        return result.id;
      }
    );
    const user: any = await User.findById(decoded).select("cart").exec();
    var chk = 0;
    for (let prdc of user.cart) {
      if (prdc.product == product) {
        prdc.quantity = Number(quantity) + prdc.quantity;
        chk = 1;
        break;
      }
    }

    if (chk == 0) {
      user.cart.push({
        product,
        quantity,
      });
    }

    await User.findByIdAndUpdate(decoded, { cart: user.cart }, { new: true });
    res.json({
      success: true,
      message: "added to cart",
    });
  } catch (error) {
    next(errorHandler(500, "not able to add to cart"));
  }
};

export const deletefromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, product } = req.body;
  try {
    if (token == undefined) return next(errorHandler(401, "unAuthenticated"));
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "haklabaBuptis",
      (err: any, result: any) => {
        if (err) return next(errorHandler(403, "forbidden"));
        return result.id;
      }
    );
    const user: any = await User.findById(decoded).select("cart").exec();
    for (let i = user.cart.length - 1; i >= 0; i--) {
      if (user.cart[i].product == product) {
        user.cart.splice(i, 1);
        break;
      }
    }

    await User.findByIdAndUpdate(decoded, { cart: user.cart }, { new: true });
    res.json({
      success: true,
      message: "removed from cart",
    });
  } catch (error) {
    next(errorHandler(500, "not able to add to cart"));
  }
};
