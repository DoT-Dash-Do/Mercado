import express from "express";
import { regSeller,loginSeller, verifyEmail } from "../controller/sellerAuthController";
import { createProduct, updateSeller } from "../controller/sellerController";
const router = express.Router();

router.post("/register",regSeller);
router.post("/login",loginSeller);
router.get("/verify-email/:chk",verifyEmail);
router.put("/updateUser/:field",updateSeller);
router.post("/uploadProduct",createProduct);
export default router;