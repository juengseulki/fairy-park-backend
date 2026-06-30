import express from "express";
import {
  getParkingsController,
  getParkingDetailController,
} from "../controllers/parkingController.js";

const router = express.Router();

router.get("/", getParkingsController);
router.get("/:id", getParkingDetailController);

export default router;
