import express from "express";
import { regUser,loginUser, verifyEmail } from "../controller/userAuthController";
const router = express.Router();

router.post("/register",regUser);
router.get("/login",loginUser);
router.get("/verify-email/:chk",verifyEmail)
export default router;