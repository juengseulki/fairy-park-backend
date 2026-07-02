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

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: 회원가입
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - nickname
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@test.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *               nickname:
 *                 type: string
 *                 example: 슬기
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *       409:
 *         description: 이미 존재하는 이메일입니다.
 */
router.post("/signup", signupController);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: 로그인
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@test.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: 로그인 성공
 *       401:
 *         description: 이메일 또는 비밀번호가 올바르지 않습니다.
 */
router.post("/login", loginController);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: 내 정보 조회
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자 정보 조회 성공
 *       401:
 *         description: 인증이 필요합니다.
 */
router.get("/me", authenticate, getMeController);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Access Token 재발급
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: 토큰 재발급 성공
 *       401:
 *         description: Refresh Token이 유효하지 않습니다.
 */
router.post("/refresh", refreshController);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: 로그아웃
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 로그아웃 성공
 */
router.post("/logout", logoutController);

export default router;
