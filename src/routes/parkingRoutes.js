import express from "express";
import {
  getParkingsController,
  getParkingDetailController,
  getNearbyParkingsController,
} from "../controllers/parkingController.js";

const router = express.Router();

/**
 * @swagger
 * /api/parkings:
 *   get:
 *     summary: 주차장 목록 조회
 *     tags:
 *       - Parking
 *     parameters:
 *       - in: query
 *         name: pageNo
 *         schema:
 *           type: integer
 *         example: 1
 *
 *       - in: query
 *         name: numOfRows
 *         schema:
 *           type: integer
 *         example: 20
 *
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         example: 서울
 *
 *       - in: query
 *         name: isFree
 *         schema:
 *           type: boolean
 *         example: true
 *
 *       - in: query
 *         name: openNow
 *         schema:
 *           type: boolean
 *         example: true
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - name
 *             - distance
 *
 *     responses:
 *       200:
 *         description: 주차장 목록 조회 성공
 */
router.get("/", getParkingsController);

/**
 * @swagger
 * /api/parkings/nearby:
 *   get:
 *     summary: 주변 주차장 조회
 *     tags:
 *       - Parking
 *
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *         example: 37.5665
 *
 *       - in: query
 *         name: lng
 *         required: true
 *         schema:
 *           type: number
 *         example: 126.9780
 *
 *       - in: query
 *         name: radius
 *         schema:
 *           type: number
 *         example: 3
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 20
 *
 *     responses:
 *       200:
 *         description: 주변 주차장 조회 성공
 *
 *       400:
 *         description: 위도와 경도가 필요합니다.
 */
router.get("/nearby", getNearbyParkingsController);

/**
 * @swagger
 * /api/parkings/{id}:
 *   get:
 *     summary: 주차장 상세 조회
 *     tags:
 *       - Parking
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 284-1-00045
 *
 *     responses:
 *       200:
 *         description: 주차장 상세 조회 성공
 *
 *       404:
 *         description: 주차장 정보를 찾을 수 없습니다.
 */
router.get("/:id", getParkingDetailController);

export default router;
