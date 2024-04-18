import express from "express";
import {
  fetchAllProducts,
  fetchSingleProduct,
} from "../controller/productController";
const router = express.Router();

router.get("/fetch-all-products", fetchAllProducts);
router.post("/fetch-single-product", fetchSingleProduct);

export default router;
