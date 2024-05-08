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
exports.fetchAllReview = exports.addReview = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const reviews_1 = __importDefault(require("../models/reviews"));
const user_1 = __importDefault(require("../models/user"));
const error_1 = require("../utils/error");
dotenv_1.default.config();
const addReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { comment, rating, product, token } = req.body;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis", (err, data) => {
            if (err) {
                return undefined;
            }
            else {
                return data.id;
            }
        });
        if (decoded === undefined) {
            return next((0, error_1.errorHandler)(501, "Unauthorized Access"));
        }
        const user = yield user_1.default.findById({ _id: decoded });
        if (user === null) {
            return next((0, error_1.errorHandler)(404, "User not found"));
        }
        const username = user === null || user === void 0 ? void 0 : user.username;
        const newReview = new reviews_1.default({
            comment,
            rating,
            product,
            username,
        });
        yield newReview.save();
        return res.status(201).json({
            message: "Review posted",
        });
    }
    catch (err) {
        return next((0, error_1.errorHandler)(501, "Unauthorized Access"));
    }
});
exports.addReview = addReview;
const fetchAllReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.params.id;
        const reviews = yield reviews_1.default.find({ product });
        return res.json({
            reviews,
        });
    }
    catch (err) {
        return next((0, error_1.errorHandler)(501, "Unauthorized Access"));
    }
});
exports.fetchAllReview = fetchAllReview;
