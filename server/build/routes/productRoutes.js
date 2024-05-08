"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controller/productController");
const router = express_1.default.Router();
router.get("/fetch-all-products", productController_1.fetchAllProducts);
router.post("/fetch-single-product", productController_1.fetchSingleProduct);
router.post("/fetch-seller-products", productController_1.fetchSellerProducts);
router.put("/update-product", productController_1.updateProduct);
router.get("/search-products/:query", productController_1.searchProducts);
exports.default = router;
