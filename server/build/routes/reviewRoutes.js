"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const reviewController_1 = require("../controller/reviewController");
router.post("/add-review", reviewController_1.addReview);
router.get("/fetch-reviews/:id", reviewController_1.fetchAllReview);
exports.default = router;
