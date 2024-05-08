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
exports.populateCart = exports.deletefromCart = exports.addToCart = exports.updateUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const product_1 = __importDefault(require("../models/product"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const error_1 = require("../utils/error");
dotenv_1.default.config();
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fieldToUpdate = req.params.field;
        if (req.body.token == undefined)
            return next((0, error_1.errorHandler)(401, "unAuthenticated"));
        const decoded = jsonwebtoken_1.default.verify(req.body.token, process.env.JWT_SECRET || "haklabaBuptis", (err, result) => {
            if (err)
                return false;
            return result.id;
        });
        if (!decoded) {
            return next((0, error_1.errorHandler)(403, "forbidden"));
        }
        if (req.body.updatedField === "") {
            return next((0, error_1.errorHandler)(404, "the field cannot be empty"));
        }
        if (fieldToUpdate === "password") {
            const chk = (yield user_1.default.findById(decoded));
            const hashChk = bcrypt_1.default.compareSync(req.body.oldPassword, chk.password);
            if (!hashChk) {
                return next((0, error_1.errorHandler)(403, "Your old password is wrong"));
            }
            req.body.updatedField = bcrypt_1.default.hashSync(req.body.updatedField, 10);
        }
        if (fieldToUpdate === "username") {
            const chk = (yield user_1.default.findOne({
                username: req.body.updatedField,
            }));
            if (chk) {
                if (chk._id == decoded)
                    return next((0, error_1.errorHandler)(550, "please enter a new username"));
                return next((0, error_1.errorHandler)(550, "username already exists"));
            }
        }
        yield user_1.default.findByIdAndUpdate(decoded, { [fieldToUpdate]: req.body.updatedField }, { new: true });
        res.status(201).json({
            success: true,
            message: "profile updated",
        });
    }
    catch (error) {
        next((0, error_1.errorHandler)(550, "failed to update the user"));
    }
});
exports.updateUser = updateUser;
const addToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, product, quantity } = req.body;
    try {
        if (token == undefined)
            return next((0, error_1.errorHandler)(401, "unAuthenticated"));
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis", (err, result) => {
            if (err)
                return false;
            return result.id;
        });
        if (!decoded) {
            return next((0, error_1.errorHandler)(403, "forbidden"));
        }
        const user = yield user_1.default.findById(decoded).select("cart").exec();
        var chk = 0;
        for (let prdc of user.cart) {
            if (prdc.product == product) {
                prdc.quantity = Number(quantity) + prdc.quantity;
                chk = 1;
                break;
            }
        }
        if (chk == 0) {
            user.cart.push({
                product,
                quantity,
            });
        }
        yield user_1.default.findByIdAndUpdate(decoded, { cart: user.cart }, { new: true });
        res.json({
            success: true,
            message: "added to cart",
        });
    }
    catch (error) {
        next((0, error_1.errorHandler)(500, "not able to add to cart"));
    }
});
exports.addToCart = addToCart;
const deletefromCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, product } = req.body;
    try {
        if (token == undefined)
            return next((0, error_1.errorHandler)(401, "unAuthenticated"));
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis", (err, result) => {
            if (err)
                return false;
            return result.id;
        });
        if (!decoded) {
            return next((0, error_1.errorHandler)(403, "forbidden"));
        }
        const user = yield user_1.default.findById(decoded).select("cart").exec();
        for (let i = user.cart.length - 1; i >= 0; i--) {
            if (user.cart[i].product == product) {
                user.cart.splice(i, 1);
                break;
            }
        }
        yield user_1.default.findByIdAndUpdate(decoded, { cart: user.cart }, { new: true });
        res.json({
            success: true,
            message: "removed from cart",
        });
    }
    catch (error) {
        next((0, error_1.errorHandler)(500, "not able to add to cart"));
    }
});
exports.deletefromCart = deletefromCart;
const populateCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        if (token == undefined)
            return next((0, error_1.errorHandler)(401, "unAuthenticated"));
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis", (err, result) => {
            if (err)
                return false;
            return result.id;
        });
        if (!decoded) {
            return next((0, error_1.errorHandler)(403, "forbidden"));
        }
        var arr = [];
        var chk = 0;
        const user = yield user_1.default.findById(decoded).select("cart").exec();
        for (let i = user.cart.length - 1; i >= 0; i--) {
            const product = yield product_1.default.findById(user.cart[i].product);
            if (product == undefined || product.stock < user.cart[i].quantity) {
                user.cart.splice(i, 1);
                chk = 1;
            }
            else {
                arr.push({
                    product: product,
                    quantity: user.cart[i].quantity
                });
            }
        }
        if (chk == 1) {
            yield user_1.default.findByIdAndUpdate(decoded, { cart: user.cart }, { new: true });
            return res.status(200).json({
                success: true,
                cart: arr,
                message: "Some items in your cart are not available right now",
            });
        }
        res.status(200).json({
            success: true,
            cart: arr,
        });
    }
    catch (error) {
        next((0, error_1.errorHandler)(550, "request not completed"));
    }
});
exports.populateCart = populateCart;
