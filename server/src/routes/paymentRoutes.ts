import express from "express";
import { callBack,payNow } from "../controller/paymentController";

const router = express.Router();

router.post("/checkout",payNow)
router.post("/callback",callBack);
export default router;