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

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, ProductName, price, type, images, stock, description } =
    req.body;

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

    const newProduct = new ProductModel({
      ProductName: ProductName,
      price,
      type,
      images,
      stock,
      soldStock: 0,
      description,
      seller,
    });

    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "New Product Created",
    });
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
  const { token, productId, updatedField } = req.body;

  try {
    const fieldToUpdate = req.params.id;

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

    if (updatedField === "") {
      return next(errorHandler(404, "the field cannot be empty"));
    }

    if (productId === "") {
      return next(errorHandler(404, "Address to update was not provided"));
    }

    await ProductModel.findByIdAndUpdate(
      { _id: productId },
      { [fieldToUpdate]: updatedField },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Updated the address successfully",
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
