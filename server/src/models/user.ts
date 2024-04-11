import { Document, Schema, model } from 'mongoose';

interface User {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

interface UserModel extends User, Document {}

const UserSchema = new Schema<UserModel>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const UserModel = model<UserModel>('User', UserSchema);

export default UserModel;