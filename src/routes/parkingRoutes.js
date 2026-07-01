import express from "express";
import {
  getParkingsController,
  getParkingDetailController,
  getNearbyParkingsController,
} from "../controllers/parkingController.js";

const router = express.Router();

router.get("/", getParkingsController);
router.get("/nearby", getNearbyParkingsController);
router.get("/:id", getParkingDetailController);

export default router;
