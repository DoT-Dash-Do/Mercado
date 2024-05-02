import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import ReviewModel from "../models/reviews";
import UserModel from "../models/user";
import { errorHandler } from "../utils/error";
dotenv.config();

export const addReview = async (req: any, res: any, next: any) => {
  const { comment, rating, product, token } = req.body;

  try {
    const decoded = jwt.verify(
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

    if (decoded === undefined) {
      return next(errorHandler(501, "Unauthorized Access"));
    }

    const user = await UserModel.findById({ _id: decoded });
    if (user === null) {
      return next(errorHandler(404, "User not found"));
    }

    const username = user?.username;

    const newReview = new ReviewModel({
      comment,
      rating,
      product,
      username,
    });

    await newReview.save();

    return res.status(201).json({
      message: "sucessfully saved",
    });
  } catch (err) {
    return next(errorHandler(501, "Unauthorized Access"));
  }
};

export const fetchAllReview = async (req: any, res: any, next: any) => {
  const { token, product } = req.body;

  try {
    const decoded = jwt.verify(
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

    if (decoded === undefined) {
      return next(errorHandler(501, "Unauthorized Access"));
    }

    const reviews = await ReviewModel.find({ product });

    return res.json({
      reviews,
    });
  } catch (err) {
    return next(errorHandler(501, "Unauthorized Access"));
  }
};
