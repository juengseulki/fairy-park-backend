import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import parkingRoutes from "./routes/parkingRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/parkings", parkingRoutes);

app.use("/api/favorites", favoriteRoutes);

app.use((error, req, res, next) => {
  const status = error.status ?? 500;

  return res.status(status).json({
    message: error.message ?? "서버 오류가 발생했습니다.",
  });
});

export default app;
