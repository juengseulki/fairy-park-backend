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

/**
 * @swagger
 * /api/history:
 *   get:
 *     summary: 최근 조회 기록 조회
 *     tags:
 *       - History
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 최근 조회 기록 조회 성공
 */
router.get("/", getMyParkingHistoriesController);

/**
 * @swagger
 * /api/history/{parkingId}:
 *   post:
 *     summary: 최근 조회 기록 저장
 *     tags:
 *       - History
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
 *         description: 최근 조회 기록 저장 성공
 */
router.post("/:parkingId", addParkingHistoryController);

/**
 * @swagger
 * /api/history:
 *   delete:
 *     summary: 최근 조회 기록 전체 삭제
 *     tags:
 *       - History
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 최근 조회 기록 전체 삭제 성공
 */
router.delete("/", removeAllParkingHistoriesController);

/**
 * @swagger
 * /api/history/{parkingId}:
 *   delete:
 *     summary: 최근 조회 기록 삭제
 *     tags:
 *       - History
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: parkingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 최근 조회 기록 삭제 성공
 */
router.delete("/:parkingId", removeParkingHistoryController);

export default router;
