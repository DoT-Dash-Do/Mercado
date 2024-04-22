import express from "express";
import {
  addOrder,
  displayOrderOfUser,
  displaySingleOrder,
} from "../controller/orderController";
const router = express.Router();

router.post("/add-order", addOrder);
router.get("/fetch-user-orders", displayOrderOfUser);
router.get("/fetch-single-order", displaySingleOrder);

export default router;
