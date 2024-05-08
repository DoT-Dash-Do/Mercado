"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AddressSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    houseNo: { type: Number, required: true },
    street: { type: String, required: true },
    pincode: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
}, { timestamps: true });
const AddressModel = (0, mongoose_1.model)("Address", AddressSchema);
exports.default = AddressModel;
