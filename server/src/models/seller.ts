import { Document, Schema, model } from 'mongoose';

export interface Seller {
  username: string;
  firstName : string;
  lastName : string;
  email: string;
  emailVerified : boolean;
  verified : boolean;
  verificationType : string;
  verificationNumber : string;
  password: string;
}

interface SellerModel extends Seller, Document {}

const SellerSchema = new Schema<SellerModel>({
  username: { type: String, required: true ,unique:true},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  emailVerified: { type: Boolean,default:false },
  verified: { type: Boolean, default:true},
  verificationType: { type: String, required: true },
  verificationNumber: { type: String,unique:true },
  password: { type: String, required: true },
},{timestamps:true});

const SellerModel = model<SellerModel>('Seller', SellerSchema);

export default SellerModel;