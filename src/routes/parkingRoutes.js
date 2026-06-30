import express from "express";
import { getParkingsController } from "../controllers/parkingController.js";

const router = express.Router();

router.get("/", getParkingsController);

export default router;
