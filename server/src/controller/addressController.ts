import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AddressModel from "../models/address";
import { errorHandler } from "../utils/error";
dotenv.config();

export const saveAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, houseNo, street, pincode, city, state } = req.body;
  try {
    const user = jwt.verify(
      token,
      process.env.JWT_SECRET || "haklabaBuptis",
      (err: any, result: any) => {
        if (err) return next(errorHandler(403, "forbidden"));
        return result.id;
      }
    );

    if (user === undefined) {
      return next(errorHandler(501, "Unauthorized access"));
    }

    const newAddress = new AddressModel({
      user,
      houseNo,
      street,
      pincode,
      city,
      state,
    });

    const saved = await newAddress.save();

    res.status(201).json({
      success: true,
      saved,
      message: "New Address Created",
    });
  } catch (err) {
    return next(errorHandler(501, "Seller already exists"));
  }
};

export const deleteAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, deletionId } = req.body;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || "haklabaBuptis");

    if (user === undefined) {
      return next(errorHandler(501, "Unauthorized access"));
    }

    await AddressModel.findByIdAndDelete({ _id: deletionId });

    return res
      .status(201)
      .json({ status: "ok", message: "Successfully deleted" });
  } catch (err) {
    return next(errorHandler(501, "Could not find the address to delete"));
  }
};

export const displayAllAddressesOfUser = async (
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
        if (err) {
          return undefined;
        } else {
          return data.id;
        }
      }
    );

    if (user === undefined) {
      return next(errorHandler(501, "Unauthorized access"));
    }

    const addresses = await AddressModel.find({ user });

    return res.status(201).json({ addresses });
  } catch (err) {
    return next(errorHandler(501, "Unauthorized access"));
  }
};

export const displaySingleAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, addressId } = req.body;

  try {
    jwt.verify(token, process.env.JWT_SECRET || "haklabaBuptis");

    const address = await AddressModel.findById({ _id: addressId });

    return res.status(201).json({ address });
  } catch (err) {
    return next(errorHandler(501, "Unauthorized access"));
  }
};

export const updateAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, addressId, updatedField } = req.body;

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

    if (addressId === "") {
      return next(errorHandler(404, "Address to update was not provided"));
    }

    await AddressModel.findByIdAndUpdate(
      { _id: addressId },
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
