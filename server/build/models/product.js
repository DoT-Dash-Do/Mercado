"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    ProductName: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    images: { type: [String], default: [] },
    stock: { type: Number, required: true },
    soldStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    seller: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Seller', required: true }
}, { timestamps: true });
const ProductModel = (0, mongoose_1.model)('Product', productSchema);
exports.default = ProductModel;
