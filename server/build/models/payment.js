"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PaymentSchema = new mongoose_1.Schema({
    amount: { type: Number, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    order_id: { type: String, required: true },
    razorpay_payment_id: { type: String, default: null },
    razorpay_order_id: { type: String, default: null },
    razorpay_order_signature: { type: String, default: null }
}, { timestamps: true });
const PaymentModel = (0, mongoose_1.model)("Payment", PaymentSchema);
exports.default = PaymentModel;
