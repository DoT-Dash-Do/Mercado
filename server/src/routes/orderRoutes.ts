import express from "express";
import {
  addOrder,
  displayOrderOfUser,
  displaySingleOrder,
  failedOrder,
  placeOrder,
} from "../controller/orderController";
const router = express.Router();

router.post("/add-order", addOrder);
router.post("/place-order", placeOrder);
router.post("/order-failed", failedOrder);
router.get("/fetch-user-orders", displayOrderOfUser);
router.get("/fetch-single-order", displaySingleOrder);

export default router;
