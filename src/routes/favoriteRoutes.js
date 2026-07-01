import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  addFavoriteController,
  removeFavoriteController,
  getMyFavoritesController,
} from "../controllers/favoriteController.js";

const router = express.Router();

router.use(authenticate);

router.get("/", getMyFavoritesController);
router.post("/:parkingId", addFavoriteController);
router.delete("/:parkingId", removeFavoriteController);

export default router;
