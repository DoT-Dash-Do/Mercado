import express from "express";
import { regUser } from "../controller/userController";
const router = express.Router();

router.post("/register",regUser);

export default router;