"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, default: false },
    profilePic: { type: String, default: "" },
    password: { type: String, required: true },
    cart: { type: [{ product: String, quantity: Number }], default: [] }
}, { timestamps: true });
const UserModel = (0, mongoose_1.model)('User', UserSchema);
exports.default = UserModel;
