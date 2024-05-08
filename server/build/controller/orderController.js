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
exports.changeOrderStatus = exports.displayOrderOfSeller = exports.displaySingleOrder = exports.displayOrderOfUser = exports.failedOrder = exports.placeOrder = exports.addOrder = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const order_1 = __importDefault(require("../models/order"));
const product_1 = __importDefault(require("../models/product"));
const seller_1 = __importDefault(require("../models/seller"));
const user_1 = __importDefault(require("../models/user"));
const error_1 = require("../utils/error");
dotenv_1.default.config();
// recieve array from req.body
const addOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, address, order_id } = req.body;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis", (err, result) => {
            if (err)
                return undefined;
            return result.id;
        });
        if (decoded === undefined) {
            return next((0, error_1.errorHandler)(501, "Unauthorized access"));
        }
        const user = yield user_1.default.findById(decoded).select("cart").exec();
        for (let i = user.cart.length - 1; i >= 0; i--) {
            const product = yield product_1.default.findById(user.cart[i].product);
            const newOrder = new order_1.default({
                address: address,
                product: user.cart[i].product,
                seller: product.seller._id,
                quantity: user.cart[i].quantity,
                user: decoded,
                order_id: order_id,
                totalPrice: Number(product.price * user.cart[i].quantity),
                status: "Payment Processing",
            });
            yield newOrder.save();
        }
        yield user_1.default.findByIdAndUpdate(decoded, {
            cart: [],
        }, { new: true });
        res.status(201).json({
            success: true,
            message: "Saved Order successfully",
        });
    }
    catch (err) {
        console.log(err);
        return next((0, error_1.errorHandler)(501, "Unauthorized access"));
    }
});
exports.addOrder = addOrder;
const placeOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, order_id, update_id } = req.body;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis", (err, result) => {
            if (err)
                return undefined;
            return result.id;
        });
        if (decoded === undefined) {
            return next((0, error_1.errorHandler)(501, "Unauthorized access"));
        }
        const order = yield order_1.default.find({ user: decoded, order_id: update_id });
        for (let i = order.length - 1; i >= 0; i--) {
            if (order[i].status === "Payment Processing") {
                yield order_1.default.findByIdAndUpdate(order[i]._id, {
                    order_id,
                    status: "order placed",
                }, { new: true });
                const seller = yield seller_1.default.findById(order[i].seller._id);
                yield seller_1.default.findByIdAndUpdate(order[i].seller._id, {
                    balance: seller.balance + order[i].totalPrice,
                }, { new: true });
                const product = yield product_1.default.findById(order[i].product._id);
                yield product_1.default.findByIdAndUpdate(order[i].product._id, {
                    soldStock: product.soldStock + order[i].quantity,
                    stock: product.stock - order[i].quantity,
                }, { new: true });
            }
        }
        res.status(201).json({
            success: true,
            message: "Saved Order successfully",
        });
    }
    catch (err) {
        console.log(err);
        return next((0, error_1.errorHandler)(501, "Unauthorized access"));
    }
});
exports.placeOrder = placeOrder;
const failedOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, update_id } = req.body;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis", (err, result) => {
            if (err)
                return undefined;
            return result.id;
        });
        if (decoded === undefined) {
            return next((0, error_1.errorHandler)(501, "Unauthorized access"));
        }
        const order = yield order_1.default.find({ user: decoded, order_id: update_id });
        for (let i = order.length - 1; i >= 0; i--) {
            if (order[i].status === "Payment Processing") {
                yield order_1.default.findByIdAndUpdate(order[i]._id, {
                    status: "payment failed",
                }, { new: true });
            }
        }
        res.status(201).json({
            success: true,
            message: "order failed to place",
        });
    }
    catch (err) {
        console.log(err);
        return next((0, error_1.errorHandler)(501, "Unauthorized access"));
    }
});
exports.failedOrder = failedOrder;
const displayOrderOfUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis", (err, data) => {
            if (err)
                return undefined;
            else
                return data.id;
        });
        if (user === undefined) {
            return next((0, error_1.errorHandler)(501, "Unauthorized Access"));
        }
        const orders = yield order_1.default.find({ user }).populate("product");
        const sentOrders = orders.filter((order) => {
            return (order === null || order === void 0 ? void 0 : order.status) !== "Payment Processing";
        });
        return res.status(201).json({ orders: sentOrders });
    }
    catch (err) {
        return next((0, error_1.errorHandler)(501, "Unauthorized Access"));
    }
});
exports.displayOrderOfUser = displayOrderOfUser;
const displaySingleOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, orderId } = req.body;
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis", (err, data) => {
            if (err)
                return undefined;
            else
                return data.id;
        });
        if (user === undefined) {
            return next((0, error_1.errorHandler)(501, "Unauthorized Access"));
        }
        const order = yield order_1.default.findById({ _id: orderId });
        return res.status(201).json({
            order,
        });
    }
    catch (err) {
        return next((0, error_1.errorHandler)(501, "Unauthorized Access"));
    }
});
exports.displaySingleOrder = displaySingleOrder;
const displayOrderOfSeller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        const seller = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis", (err, data) => {
            if (err)
                return undefined;
            else
                return data.id;
        });
        if (seller === undefined) {
            return next((0, error_1.errorHandler)(501, "Unauthorized Access"));
        }
        const orders = yield order_1.default.find({ seller }).populate("product");
        res.status(201).json({ orders });
    }
    catch (err) {
        return next((0, error_1.errorHandler)(501, "Unauthorized Access"));
    }
});
exports.displayOrderOfSeller = displayOrderOfSeller;
const changeOrderStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, order, changeStatus } = req.body;
    try {
        const seller = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis", (err, data) => {
            if (err)
                return undefined;
            else
                return data.id;
        });
        if (seller === undefined) {
            return next((0, error_1.errorHandler)(501, "Unauthorized Access"));
        }
        yield order_1.default.findByIdAndUpdate({ _id: order }, { status: changeStatus }, { new: true });
        return res.status(201).json({ message: "Successfully Updated" });
    }
    catch (err) {
        return next((0, error_1.errorHandler)(501, "Could not complete the request"));
    }
});
exports.changeOrderStatus = changeOrderStatus;
