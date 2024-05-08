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
exports.fetchDashBoardDetails = exports.fetchProducts = exports.createProduct = exports.updateSeller = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const seller_1 = __importDefault(require("../models/seller"));
const error_1 = require("../utils/error");
const product_1 = __importDefault(require("../models/product"));
dotenv_1.default.config();
const updateSeller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            const chk = (yield seller_1.default.findById(decoded));
            const hashChk = bcrypt_1.default.compareSync(req.body.oldPassword, chk.password);
            if (!hashChk) {
                return next((0, error_1.errorHandler)(403, "old password doesnt match the new password"));
            }
            req.body.updatedField = bcrypt_1.default.hashSync(req.body.updatedField, 10);
        }
        if (fieldToUpdate === "username") {
            const chk = (yield seller_1.default.findOne({
                username: req.body.updatedField,
            }));
            if (chk) {
                if (chk._id == decoded)
                    return next((0, error_1.errorHandler)(550, "please enter a new username"));
                return next((0, error_1.errorHandler)(550, "username already exists"));
            }
        }
        yield seller_1.default.findByIdAndUpdate(decoded, { [fieldToUpdate]: req.body.updatedField }, { new: true });
        res.status(201).json({
            success: true,
            message: "profile updated",
        });
    }
    catch (error) {
        next((0, error_1.errorHandler)(550, "failed to update the Seller"));
    }
});
exports.updateSeller = updateSeller;
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { ProductName, price, type, description, images, stock, token } = req.body;
    try {
        if (token == undefined)
            return next((0, error_1.errorHandler)(401, "unAuthenticated"));
        const seller = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis", (err, result) => {
            if (err)
                return false;
            return result.id;
        });
        if (!seller) {
            return next((0, error_1.errorHandler)(403, "forbidden"));
        }
        const newProduct = new product_1.default({
            ProductName,
            price,
            type,
            description,
            images,
            stock,
            seller,
        });
        yield newProduct.save();
        res.status(200).json({
            success: true,
            message: "product Created",
        });
    }
    catch (error) {
        next((0, error_1.errorHandler)(550, "cannot create procuxt"));
    }
});
exports.createProduct = createProduct;
const fetchProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, type } = req.body;
    try {
        const seller = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis", (err, result) => {
            if (err)
                return next((0, error_1.errorHandler)(403, "forbidden"));
            return result.id;
        });
        if (type !== "seller") {
            return next((0, error_1.errorHandler)(501, "Unauthorized Access"));
        }
        const products = yield product_1.default.find({ seller });
        return res.status(201).json({
            products,
            type,
            seller,
        });
    }
    catch (err) {
        return next((0, error_1.errorHandler)(501, "Unauthorized Access"));
    }
});
exports.fetchProducts = fetchProducts;
const fetchDashBoardDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        if (req.body.token == undefined)
            return next((0, error_1.errorHandler)(401, "unAuthenticated"));
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis", (err, result) => {
            if (err)
                return false;
            return result.id;
        });
        const seller = yield seller_1.default.findById(decoded).select('balance username');
        const products = yield product_1.default.find({ seller: decoded });
        res.status(200).json({ data: {
                username: seller.username,
                balance: seller.balance,
                products: products.length
            } });
    }
    catch (error) {
        next((0, error_1.errorHandler)(500, "not able to find seller"));
    }
});
exports.fetchDashBoardDetails = fetchDashBoardDetails;
