import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  addSearchHistoryController,
  getMySearchHistoriesController,
  removeSearchHistoryController,
  removeAllSearchHistoriesController,
} from "../controllers/searchHistoryController.js";

const router = express.Router();

router.use(authenticate);

router.get("/", getMySearchHistoriesController);
router.post("/", addSearchHistoryController);
router.delete("/", removeAllSearchHistoriesController);
router.delete("/:id", removeSearchHistoryController);

export default router;
