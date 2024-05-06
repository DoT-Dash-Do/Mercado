import express from "express";
import {
  addOrder,
  changeOrderStatus,
  displayOrderOfSeller,
  displayOrderOfUser,
  displaySingleOrder,
  failedOrder,
  placeOrder,
} from "../controller/orderController";
const router = express.Router();

router.post("/add-order", addOrder);
router.post("/place-order", placeOrder);
router.post("/order-failed", failedOrder);
router.post("/fetch-user-orders", displayOrderOfUser);
router.post("/fetch-single-order", displaySingleOrder);
router.post("/fetch-seller-order", displayOrderOfSeller);
router.put("/change-order-status", changeOrderStatus);
export default router;
