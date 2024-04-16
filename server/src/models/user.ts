import { Document, Schema, model } from 'mongoose';

interface User {
  username: string;
  firstName:string;
  lastName:string;
  email: string;
  emailVerified : boolean;
  profilePic : string;
  password: string;
  cart : {
    product : string,
    quantity : number
  } [];
}
interface UserModel extends User, Document {}
const UserSchema = new Schema<UserModel>({
  username: { type: String, required: true ,unique:true},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  emailVerified:{type:Boolean,default:false},
  profilePic:{type:String,default:""},
  password: { type: String, required: true },
  cart:{type:[{product:String,quantity:Number}],default:[]} 
},{timestamps:true});
const UserModel = model<UserModel>('User', UserSchema);
export default UserModel;