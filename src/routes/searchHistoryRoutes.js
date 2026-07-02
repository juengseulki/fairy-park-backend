import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  addSearchHistoryController,
  getMySearchHistoriesController,
  removeSearchHistoryController,
  removeAllSearchHistoriesController,
  getPopularSearchKeywordsController,
} from "../controllers/searchHistoryController.js";

const router = express.Router();

router.get("/popular", getPopularSearchKeywordsController);

router.use(authenticate);

router.get("/", getMySearchHistoriesController);
router.post("/", addSearchHistoryController);
router.delete("/", removeAllSearchHistoriesController);
router.delete("/:id", removeSearchHistoryController);

export default router;
