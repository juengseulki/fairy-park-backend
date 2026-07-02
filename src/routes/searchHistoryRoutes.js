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

/**
 * @swagger
 * /api/search-history/popular:
 *   get:
 *     summary: 인기 검색어 조회
 *     tags:
 *       - Search History
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *     responses:
 *       200:
 *         description: 인기 검색어 조회 성공
 */
router.get("/popular", getPopularSearchKeywordsController);

router.use(authenticate);

/**
 * @swagger
 * /api/search-history:
 *   get:
 *     summary: 내 검색 기록 조회
 *     tags:
 *       - Search History
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 검색 기록 조회 성공
 */
router.get("/", getMySearchHistoriesController);

/**
 * @swagger
 * /api/search-history:
 *   post:
 *     summary: 검색 기록 저장
 *     tags:
 *       - Search History
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               keyword:
 *                 type: string
 *                 example: 서울역
 *     responses:
 *       201:
 *         description: 검색 기록 저장 성공
 */
router.post("/", addSearchHistoryController);

/**
 * @swagger
 * /api/search-history:
 *   delete:
 *     summary: 검색 기록 전체 삭제
 *     tags:
 *       - Search History
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 검색 기록 전체 삭제 성공
 */
router.delete("/", removeAllSearchHistoriesController);

/**
 * @swagger
 * /api/search-history/{id}:
 *   delete:
 *     summary: 검색 기록 삭제
 *     tags:
 *       - Search History
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 검색 기록 삭제 성공
 */
router.delete("/:id", removeSearchHistoryController);

export default router;
