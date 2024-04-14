import express from "express";
import {
  loginUser,
  regUser,
  verifyEmail,
} from "../controller/userAuthController";
const router = express.Router();

router.post("/register", regUser);
router.post("/login", loginUser);
router.get("/verify-email/:chk", verifyEmail);
export default router;
