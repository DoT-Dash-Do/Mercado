import express from "express";
import {
  loginUser,
  regUser,
  verifyEmail,
} from "../controller/userAuthController";
import {addToCart, deletefromCart, updateUser} from "../controller/userController"
const router = express.Router();

router.post("/register", regUser);
router.post("/login", loginUser);
router.get("/verify-email/:chk", verifyEmail);
router.put("/updateUser/:field",updateUser);
router.put("/addtocart",addToCart);
router.put("/removefromcart",deletefromCart)
export default router;
