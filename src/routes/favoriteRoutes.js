import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  addFavoriteController,
  removeFavoriteController,
  getMyFavoritesController,
} from "../controllers/favoriteController.js";

const router = express.Router();

router.use(authenticate);

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: 내 즐겨찾기 조회
 *     tags:
 *       - Favorite
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 즐겨찾기 조회 성공
 */
router.get("/", getMyFavoritesController);

/**
 * @swagger
 * /api/favorites/{parkingId}:
 *   post:
 *     summary: 즐겨찾기 등록
 *     tags:
 *       - Favorite
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: parkingId
 *         required: true
 *         schema:
 *           type: string
 *         example: 284-1-00045
 *     responses:
 *       201:
 *         description: 즐겨찾기 등록 성공
 *       409:
 *         description: 이미 등록된 즐겨찾기
 */
router.post("/:parkingId", addFavoriteController);

/**
 * @swagger
 * /api/favorites/{parkingId}:
 *   delete:
 *     summary: 즐겨찾기 삭제
 *     tags:
 *       - Favorite
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: parkingId
 *         required: true
 *         schema:
 *           type: string
 *         example: 284-1-00045
 *     responses:
 *       200:
 *         description: 즐겨찾기 삭제 성공
 */
router.delete("/:parkingId", removeFavoriteController);

export default router;
