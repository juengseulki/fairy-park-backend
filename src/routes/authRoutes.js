import express from "express";
import {
  loginController,
  signupController,
  getMeController,
} from "../controllers/authController.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/me", authenticate, getMeController);

export default router;
