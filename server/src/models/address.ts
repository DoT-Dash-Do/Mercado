import { Document, Schema, Types, model } from "mongoose";
import User from "./user";
export interface Address {
  user: Types.ObjectId | User;
  houseNo: number;
  street: string;
  pincode: number;
  city: string;
  state: string;
}

interface AddressModel extends Address, Document {}

const AddressSchema = new Schema<AddressModel>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    houseNo: { type: Number, required: true },
    street: { type: String, required: true },
    pincode: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  { timestamps: true }
);

const AddressModel = model<AddressModel>("Address", AddressSchema);

export default AddressModel;
