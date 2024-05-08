import { Document, Schema, Types, model } from "mongoose";
import User from "./user";
import Product from "./product";
import Seller from "./seller";
export interface Order {
  address: string;
  user: Types.ObjectId | User;
  product : Types.ObjectId | Product;
  seller : Types.ObjectId | Seller;
  order_id:string;
  status : string;
  quantity:number;
  totalPrice: number;
}
interface OrderModel extends Order, Document {}

const OrderSchema = new Schema<OrderModel>(
  {
    address: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    order_id:{type:String,required:true},
    status : {type:String,required:true},
    seller:{ type: Schema.Types.ObjectId, ref: "Seller", required: true },
    quantity:{type:Number,required:true},
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const OrderModel = model<OrderModel>("Order", OrderSchema);

export default OrderModel;


//seller 
//product id
//quantity