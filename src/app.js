import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import parkingRoutes from "./routes/parkingRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import searchHistoryRoutes from "./routes/searchHistoryRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/parkings", parkingRoutes);

app.use("/api/favorites", favoriteRoutes);

app.use("/api/history", historyRoutes);

app.use("/api/search-history", searchHistoryRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((error, req, res, next) => {
  const status = error.status ?? 500;

  return res.status(status).json({
    message: error.message ?? "서버 오류가 발생했습니다.",
  });
});

export default app;
