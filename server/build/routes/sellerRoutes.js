"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sellerAuthController_1 = require("../controller/sellerAuthController");
const sellerController_1 = require("../controller/sellerController");
const router = express_1.default.Router();
router.post("/register", sellerAuthController_1.regSeller);
router.post("/login", sellerAuthController_1.loginSeller);
router.get("/verify-email/:chk", sellerAuthController_1.verifyEmail);
router.put("/updateSeller/:field", sellerController_1.updateSeller);
router.post("/uploadProduct", sellerController_1.createProduct);
router.post("/get-seller-data", sellerAuthController_1.getSellerData);
router.post("/fetch-products", sellerController_1.fetchProducts);
router.post("/get-profile-pic", sellerAuthController_1.getSellerProfilePic);
router.post("/get-dashboard-details", sellerController_1.fetchDashBoardDetails);
exports.default = router;
