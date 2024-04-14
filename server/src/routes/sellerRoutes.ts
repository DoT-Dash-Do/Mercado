import express from "express";
import { regSeller,loginSeller, verifyEmail } from "../controller/sellerAuthController";
const router = express.Router();

router.post("/register",regSeller);
router.get("/login",loginSeller);
router.get("/verify-email/:chk",verifyEmail)
export default router;