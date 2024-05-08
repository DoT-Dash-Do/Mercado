"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SellerSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, default: false },
    verified: { type: Boolean, default: true },
    verificationType: { type: String, required: true },
    verificationNumber: { type: String, unique: true },
    balance: { type: Number, default: 0 },
    profilePic: { type: String, default: "" },
    password: { type: String, required: true },
}, { timestamps: true });
const SellerModel = (0, mongoose_1.model)('Seller', SellerSchema);
exports.default = SellerModel;
