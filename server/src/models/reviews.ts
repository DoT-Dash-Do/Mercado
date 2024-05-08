import { Document, Schema, Types, model } from "mongoose";
import Product from "./product";
export interface Review {
  comment: string;
  rating: number;
  product: Types.ObjectId | Product;
  username: string;
}
interface ReviewModel extends Review, Document {}

const ReviewSchema = new Schema<ReviewModel>(
  {
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    username: { type: String, required: true },
  },
  { timestamps: true }
);

const ReviewModel = model<ReviewModel>("Review", ReviewSchema);

export default ReviewModel;
