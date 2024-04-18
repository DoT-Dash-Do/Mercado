import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { default as Product, default as ProductModel } from "../models/product";
import Seller from "../models/seller";
import { errorHandler } from "../utils/error";

import Product from "../models/product";
dotenv.config();

export const updateSeller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fieldToUpdate = req.params.field;
    if (req.body.token == undefined)
      return next(errorHandler(401, "unAuthenticated"));

    const decoded: any = jwt.verify(
      req.body.token,
      process.env.JWT_SECRET || "haklabaBuptis",
      (err: any, result: any) => {
        if (err) return false;
        return result.id;
      }
    );
    if (!decoded) {
      return next(errorHandler(403, "forbidden"));
    }
    if (req.body.updatedField === "") {
      return next(errorHandler(404, "the field cannot be empty"));
    }
    if (fieldToUpdate === "password") {
      const chk = (await Seller.findById(decoded)) as Seller;
      const hashChk = bcrypt.compareSync(req.body.oldPassword, chk.password);
      if (!hashChk) {
        return next(
          errorHandler(403, "old password doesnt match the new password")
        );
      }
      req.body.updatedField = bcrypt.hashSync(req.body.updatedField, 10);
    }
    if (fieldToUpdate === "username") {
      const chk = (await Seller.findOne({
        username: req.body.updatedField,
      })) as Seller;
      if (chk) {
        if (chk._id == decoded)
          return next(errorHandler(550, "please enter a new username"));
        return next(errorHandler(550, "username already exists"));
      }
    }
    await Seller.findByIdAndUpdate(
      decoded,
      { [fieldToUpdate]: req.body.updatedField },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "profile updated",
    });
  } catch (error) {
    next(errorHandler(550, "failed to update the Seller"));
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { ProductName, price, type, description, images, stock, token } =
    req.body;
  try {
    if (token == undefined) return next(errorHandler(401, "unAuthenticated"));

    const seller:any = jwt.verify(
      token,
      process.env.JWT_SECRET || "haklabaBuptis",
      (err: any, result: any) => {
        if (err) return false;
        return result.id;
      }
    );
    if (!seller) {
      return next(errorHandler(403, "forbidden"));
    }
    const newProduct = new Product({
      ProductName,
      price,
      type,
      description,
      images,
      stock,
      seller,
    });
    await newProduct.save();
    res.status(200).json({
      success: true,
      message: "product Created",
    });
  } catch (error) {
    next(errorHandler(550, "cannot create procuxt"));
  }

export const fetchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, type } = req.body;

  try {
    const seller = jwt.verify(
      token,
      process.env.JWT_SECRET || "haklabaBuptis",
      (err: any, result: any) => {
        if (err) return next(errorHandler(403, "forbidden"));
        return result.id;
      }
    );
    if (type !== "seller") {
      return next(errorHandler(501, "Unauthorized Access"));
    }

    const products = await ProductModel.find({ seller });
    return res.status(201).json({
      products,
      type,
      seller,
    });
  } catch (err) {
    return next(errorHandler(501, "Unauthorized Access"));
  }

};
