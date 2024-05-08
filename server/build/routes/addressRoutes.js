"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addressController_1 = require("../controller/addressController");
const router = express_1.default.Router();
router.post("/save-address", addressController_1.saveAddress);
router.post("/delete-address", addressController_1.deleteAddress);
router.post("/display-all-addresses", addressController_1.displayAllAddressesOfUser);
router.post("/display-single-address", addressController_1.displaySingleAddress);
router.put("/update-address/:id", addressController_1.updateAddress);
exports.default = router;
