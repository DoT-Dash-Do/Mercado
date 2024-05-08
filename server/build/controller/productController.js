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
exports.searchProducts = exports.fetchSellerProducts = exports.updateProduct = exports.deleteProduct = exports.fetchSingleProduct = exports.fetchAllProducts = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const product_1 = __importDefault(require("../models/product"));
const error_1 = require("../utils/error");
dotenv_1.default.config();
const fetchAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find({});
        return res.status(201).json({ products });
    }
    catch (err) {
        return next((0, error_1.errorHandler)(501, "Unauthorized access"));
    }
});
exports.fetchAllProducts = fetchAllProducts;
const fetchSingleProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.body;
    try {
        const product = (yield product_1.default.findById({
            _id: productId,
        }));
        res.status(201).json({ product });
    }
    catch (err) {
        return next((0, error_1.errorHandler)(501, "Unauthorized Access"));
    }
});
exports.fetchSingleProduct = fetchSingleProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, productId } = req.body;
    try {
        const seller = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis", (err, data) => {
            if (err) {
                return undefined;
            }
            else {
                return data.id;
            }
        });
        if (seller === undefined) {
            return next((0, error_1.errorHandler)(501, "Unauthorized Access"));
        }
        yield product_1.default.findByIdAndDelete({ _id: productId });
        return res.status(201).json({
            message: "Deleted Product Successfully",
        });
    }
    catch (_a) {
        return next((0, error_1.errorHandler)(501, "Unauthorized Access"));
    }
});
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { ProductName, price, type, description, images, stock, productId, token, } = req.body;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis", (err, result) => {
            if (err)
                return undefined;
            return result.id;
        });
        if (decoded === undefined) {
            return next((0, error_1.errorHandler)(501, "Unauthorized access"));
        }
        yield product_1.default.findByIdAndUpdate(productId, { ProductName, price, type, description, images, stock }, { new: true });
        return res.status(201).json({
            message: "Successfully Updated",
        });
    }
    catch (err) {
        return next((0, error_1.errorHandler)(501, "Unauthorized access"));
    }
});
exports.updateProduct = updateProduct;
const fetchSellerProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        if (req.body.token == undefined)
            return next((0, error_1.errorHandler)(401, "unAuthenticated"));
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis", (err, result) => {
            if (err)
                return false;
            return result.id;
        });
        const products = yield product_1.default.find({ seller: decoded });
        return res.status(201).json({ products });
    }
    catch (err) {
        return next((0, error_1.errorHandler)(501, "Unauthorized access"));
    }
});
exports.fetchSellerProducts = fetchSellerProducts;
const searchProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.params;
    try {
        const result = yield product_1.default.find({ ProductName: { $regex: query, $options: 'i' } });
        res.status(200).json({ result });
    }
    catch (error) {
        next((0, error_1.errorHandler)(404, "not found"));
    }
});
exports.searchProducts = searchProducts;
