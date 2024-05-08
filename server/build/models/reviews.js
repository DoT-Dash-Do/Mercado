"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    username: { type: String, required: true },
}, { timestamps: true });
const ReviewModel = (0, mongoose_1.model)("Review", ReviewSchema);
exports.default = ReviewModel;
