"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callBack = exports.payNow = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const dotenv_1 = __importDefault(require("dotenv"));
const payment_1 = __importDefault(require("../models/payment"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../utils/error");
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
const razorpay = new razorpay_1.default({
    key_id: process.env.KEY_ID || "check",
    key_secret: process.env.KEY_SECRET || "check",
});
const payNow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, amount } = req.body;
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis", (err, data) => {
            if (err) {
                return undefined;
            }
            else {
                return data.id;
            }
        });
        const order = yield razorpay.orders.create({
            amount: Number(amount * 100),
            currency: "INR"
        });
        yield payment_1.default.create({
            order_id: order.id,
            user,
            amount: amount,
        });
        res.status(200).json({
            order
        });
    }
    catch (error) {
        return next((0, error_1.errorHandler)(404, "order not complete"));
    }
});
exports.payNow = payNow;
const callBack = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const body_data = razorpay_order_id + "|" + razorpay_payment_id;
    const expect = crypto_1.default.createHmac('sha256', process.env.KEY_SECRET || "sdhjk").update(body_data).digest("hex");
    const isValid = (expect === razorpay_signature);
    if (isValid) {
        yield payment_1.default.findOneAndUpdate({ order_id: razorpay_order_id }, {
            $set: {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_order_signature: razorpay_signature
            }
        });
        return res.json(`/paymentsuccess/${razorpay_order_id}`);
    }
    else {
        res.json("/cart");
        return;
    }
});
exports.callBack = callBack;
