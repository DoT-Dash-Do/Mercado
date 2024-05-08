"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    address: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    order_id: { type: String, required: true },
    status: { type: String, required: true },
    seller: { type: mongoose_1.Schema.Types.ObjectId, ref: "Seller", required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
}, { timestamps: true });
const OrderModel = (0, mongoose_1.model)("Order", OrderSchema);
exports.default = OrderModel;
//seller 
//product id
//quantity
