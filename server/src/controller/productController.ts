import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import ProductModel, { Product } from "../models/product";
import { errorHandler } from "../utils/error";
import jwt from "jsonwebtoken";
dotenv.config();

export const fetchAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await ProductModel.find({});

    return res.status(201).json({ products });
  } catch (err) {
    return next(errorHandler(501, "Unauthorized access"));
  }
};

export const fetchSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId } = req.body;

  try {
    const product = (await ProductModel.findById({
      _id: productId,
    })) as Product;

    res.status(201).json({ product });
  } catch (err) {
    return next(errorHandler(501, "Unauthorized Access"));
  }
};

export const fetchSellerProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {token} = req.body;
  try {
    if (req.body.token == undefined)
      return next(errorHandler(401, "unAuthenticated"));

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET || "haklabaBuptis",
      (err: any, result: any) => {
        if (err) return false;
        return result.id;
      }
    );
    
    const products = await ProductModel.find({seller:decoded});
    return res.status(201).json({ products });
  } catch (err) {
    return next(errorHandler(501, "Unauthorized access"));
  }
};
