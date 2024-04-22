import { Document, Schema, Types, model } from "mongoose";
import User from "./user";
export interface Order {
  address: string;
  user: Types.ObjectId | User;
  products: string[];
  totalPrice: number;
}

interface OrderModel extends Order, Document {}

const OrderSchema = new Schema<OrderModel>(
  {
    address: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: { type: [String], default: [] }, //change
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const OrderModel = model<OrderModel>("Order", OrderSchema);

export default OrderModel;


//seller 
//product id
//quantity