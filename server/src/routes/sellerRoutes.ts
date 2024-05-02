import express from "express";
import {
  getSellerData,
  getSellerProfilePic,
  loginSeller,
  regSeller,
  verifyEmail,
} from "../controller/sellerAuthController";
import {
  createProduct,
  fetchDashBoardDetails,
  fetchProducts,
  updateSeller,
} from "../controller/sellerController";
const router = express.Router();

router.post("/register", regSeller);
router.post("/login", loginSeller);
router.get("/verify-email/:chk", verifyEmail);
router.put("/updateSeller/:field", updateSeller);
router.post("/uploadProduct", createProduct);
router.post("/get-seller-data", getSellerData);
router.post("/fetch-products", fetchProducts);
router.post("/get-profile-pic", getSellerProfilePic);
router.post("/get-dashboard-details",fetchDashBoardDetails);
export default router;
