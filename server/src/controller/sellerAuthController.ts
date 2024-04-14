import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import Seller from "../models/seller";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { transporter } from "../utils/nodemailer";
import { errorHandler } from "../utils/error";
import { htmlResponse } from "../utils/htmlResponse";
dotenv.config();

export const regSeller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    firstName,
    lastName,
    username,
    verificationType,
    verificationNumber,
    email,
    password,
  } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newSeller = new Seller({
    firstName,
    lastName,
    username,
    verificationType,
    verificationNumber,
    email,
    password: hashedPassword,
  });
  try {
    const hello = await newSeller.save();
    const verifyLink = hello.email + "*_*" + newSeller._id;
    await transporter.sendMail(
      {
        from: "fakesteam26@gmail.com",
        to: newSeller.email,
        subject: "verification mail",
        text: "",
        html: `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 10px; padding: 20px;">
            <h2 style="text-align: center; color: #333;">Email Verification</h2>
            <p style="text-align: left; color: #333;">Dear User,</p>
            <p style="text-align: left; color: #333;">Welcome to our platform! To complete your registration, please click the link below to verify your email address:</p>
            <p style="text-align: center; margin-top: 30px;"><a href="http://localhost:3003/api/seller/verify-email/${verifyLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email</a></p>
            <p style="text-align: left; color: #333;">If you didn't sign up for our platform, you can ignore this email.</p>
            <p style="text-align: left; color: #333;">Thanks,<br> Your Company Name</p>
        </div>
    </div>`,
      },
      (error, info) => {
        if (error) {
          return next(errorHandler(550, "not able to send verification mail"));
        }
      }
    );
    res.status(201).json({
      success: true,
      message: "new seller created",
    });
  } catch (error) {
    next(errorHandler(550, "seller already exists"));
  }
};
export const loginSeller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const { email, password } = req.body;
  try {
    const validU = await Seller.findOne({ email });
    if (!validU) return next(errorHandler(404, "wrong credentials"));
    const passCheck = bcrypt.compareSync(password, validU.password);
    if (!passCheck) return next(errorHandler(401, "wrong credentials"));
    const token = jwt.sign(
      { id: validU._id },
      process.env.JWT_SECRET || "haklabaBuptis"
    );
    const { password: pass, ...rest } = validU.toObject() as Seller;
    if (rest.emailVerified == false) {
        return next(errorHandler(550, "Email has not been verified"));
    }
    if(rest.verified == false)
    {
        return next(errorHandler(550,"Email has not been verified"));
    }
    res
      .cookie("Current_User", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(errorHandler(500, "internal server error"));
  }
};
export const verifyEmail = async (
    req: Request,
    res: Response
  ) => {
    try {
      const chk = req.params.chk;
      const linkSplit = chk.split("*_*");
      await Seller.findByIdAndUpdate(
        linkSplit[1],
        { emailVerified: true },
        { new: true }
      );
      
      res.status(200).send(htmlResponse);
    } catch (error) {
      console.log(error);
    }
  };
