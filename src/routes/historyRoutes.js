import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  addParkingHistoryController,
  getMyParkingHistoriesController,
  removeParkingHistoryController,
  removeAllParkingHistoriesController,
} from "../controllers/historyController.js";

const router = express.Router();

router.use(authenticate);

router.get("/", getMyParkingHistoriesController);
router.post("/:parkingId", addParkingHistoryController);
router.delete("/", removeAllParkingHistoriesController);
router.delete("/:parkingId", removeParkingHistoryController);

export default router;
