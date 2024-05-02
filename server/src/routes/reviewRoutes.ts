import express from "express";
const router = express.Router();

import { addReview, fetchAllReview } from "../controller/reviewController";

router.post("/add-review", addReview);
router.post("/fetch-reviews", fetchAllReview);

export default router;
