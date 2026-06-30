import express from "express";
import {
  loginController,
  signupController,
  getMeController,
  refreshController,
  logoutController,
} from "../controllers/authController.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/me", authenticate, getMeController);
router.post("/refresh", refreshController);
router.post("/logout", logoutController);

export default router;
