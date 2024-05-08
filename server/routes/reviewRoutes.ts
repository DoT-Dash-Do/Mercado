import express from "express";
const router = express.Router();

import { addReview, fetchAllReview } from "../controller/reviewController";

router.post("/add-review", addReview);
router.get("/fetch-reviews/:id", fetchAllReview);

export default router;
