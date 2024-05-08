"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controller/orderController");
const router = express_1.default.Router();
router.post("/add-order", orderController_1.addOrder);
router.post("/place-order", orderController_1.placeOrder);
router.post("/order-failed", orderController_1.failedOrder);
router.post("/fetch-user-orders", orderController_1.displayOrderOfUser);
router.post("/fetch-single-order", orderController_1.displaySingleOrder);
router.post("/fetch-seller-order", orderController_1.displayOrderOfSeller);
router.put("/change-order-status", orderController_1.changeOrderStatus);
exports.default = router;
