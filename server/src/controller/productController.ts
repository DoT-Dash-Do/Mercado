import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ProductModel, { Product } from "../models/product";
import { errorHandler } from "../utils/error";
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

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, productId } = req.body;

  try {
    const seller = jwt.verify(
      token,
      process.env.JWT_SECRET || "haklabaBuptis",
      (err: any, data: any) => {
        if (err) {
          return undefined;
        } else {
          return data.id;
        }
      }
    );

    if (seller === undefined) {
      return next(errorHandler(501, "Unauthorized Access"));
    }

    await ProductModel.findByIdAndDelete({ _id: productId });

    return res.status(201).json({
      message: "Deleted Product Successfully",
    });
  } catch {
    return next(errorHandler(501, "Unauthorized Access"));
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    ProductName,
    price,
    type,
    description,
    images,
    stock,
    productId,
    token,
  } = req.body;

  try {
    const decoded = jwt.verify(
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

    await ProductModel.findByIdAndUpdate(
      productId,
      { ProductName, price, type, description, images, stock },
      { new: true }
    );

    return res.status(201).json({
      message: "Successfully Updated",
    });
  } catch (err) {
    return next(errorHandler(501, "Unauthorized access"));
  }
};
export const fetchSellerProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body;
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

    const products = await ProductModel.find({ seller: decoded });
    return res.status(201).json({ products });
  } catch (err) {
    return next(errorHandler(501, "Unauthorized access"));
  }
};

export const searchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
)=>{
  const {query} = req.params;
  try {
    const result = await ProductModel.find({ProductName:{$regex:query,$options:'i'}});
    res.status(200).json({result});
  } catch (error) {
    next(errorHandler(404,"not found"));
  }
}