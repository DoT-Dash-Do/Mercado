import express from "express";
import {
  fetchAllProducts,
  fetchSellerProducts,
  fetchSingleProduct,
  searchProducts,
  updateProduct,
} from "../controller/productController";
const router = express.Router();

router.get("/fetch-all-products", fetchAllProducts);
router.post("/fetch-single-product", fetchSingleProduct);
router.post("/fetch-seller-products", fetchSellerProducts);
router.put("/update-product", updateProduct);
router.get("/search-products/:query",searchProducts)
export default router;
