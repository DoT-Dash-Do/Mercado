import { Document, Schema, Types, model } from "mongoose";
import User from "./user";
export interface Payment {
  name: string;
  amount:number;
  user: Types.ObjectId | User;
  order_id:string;
  razorpay_payment_id:String;
  razorpay_order_id:String;
  razorpay_order_signature:String;
}

interface PaymentModel extends Payment, Document {}

const PaymentSchema = new Schema<PaymentModel>(
  {
    amount: {type : Number, required: true},
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    order_id: {type : String, required: true},
    razorpay_payment_id: {type : String, default: null},
    razorpay_order_id: {type : String, default: null},
    razorpay_order_signature: {type : String, default: null}
  },
  { timestamps: true }
);

const PaymentModel = model<PaymentModel>("Payment", PaymentSchema);

export default PaymentModel;
