import Razorpay from "razorpay";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import PaymentModel from "../models/payment";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error";
import crypto from "crypto";
dotenv.config();
const razorpay = new Razorpay({
  key_id: process.env.KEY_ID || "check",
  key_secret: process.env.KEY_SECRET || "check",
});
export const payNow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, amount } = req.body;
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
    const order = await razorpay.orders.create({
        amount:Number(amount*100),
        currency:"INR"
    })
    
    await PaymentModel.create({
        order_id:order.id,
        user,
        amount:amount,
    })
    res.status(200).json({
        order
    })
  } catch (error) {
    return next(errorHandler(404,"order not complete"))
  }
};

export const callBack = async (
    req: any,
    res: any,
    next: any
  ) => {
    const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body;
    const body_data = razorpay_order_id+"|"+razorpay_payment_id;
    const expect = crypto.createHmac('sha256',process.env.KEY_SECRET || "sdhjk").update(body_data).digest("hex");
    const isValid = (expect === razorpay_signature);
    if(isValid)
        {
            await PaymentModel.findOneAndUpdate({order_id:razorpay_order_id},{
                $set:{
                    razorpay_payment_id,
                    razorpay_order_id,
                    razorpay_order_signature:razorpay_signature
                }
            })
            return res.json(`/paymentsuccess/${razorpay_order_id}`);
            
        }
    else
        {
            res.json("/cart");
            return;
        }
  }
