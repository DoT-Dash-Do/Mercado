import express from "express";
import {
  deleteAddress,
  displayAllAddressesOfUser,
  displaySingleAddress,
  saveAddress,
  updateAddress,
} from "../controller/addressController";
const router = express.Router();

router.post("/save-address", saveAddress);
router.post("/delete-address", deleteAddress);
router.post("/display-all-addresses", displayAllAddressesOfUser);
router.get("/display-single-address", displaySingleAddress);
router.put("/update-address/:id", updateAddress);

export default router;
