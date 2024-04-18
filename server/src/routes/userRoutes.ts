import express from "express";
import {
  getUserData,
  loginUser,
  regUser,
  userValidity,
  verifyEmail,
} from "../controller/userAuthController";
import {
  addToCart,
  deletefromCart,
  fetchAllProducts,
  fetchSingleProduct,
  updateUser,
} from "../controller/userController";
const router = express.Router();

router.post("/register", regUser);
router.post("/login", loginUser);
router.get("/verify-email/:chk", verifyEmail);
router.put("/updateUser/:field", updateUser);
router.put("/addtocart", addToCart);
router.put("/removefromcart", deletefromCart);
router.post("/get-user-data", getUserData);
router.post("/user-validity", userValidity);

router.get("/fetch-all-products", fetchAllProducts);
router.post("/fetch-single-product", fetchSingleProduct);
export default router;
