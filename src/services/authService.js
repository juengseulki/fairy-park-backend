import bcrypt from "bcrypt";
import {
  createUser,
  findUserByEmail,
  findUserByEmailWithPassword,
  findUserById,
} from "../repositories/userRepository.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/token.js";
import {
  createRefreshToken,
  findRefreshToken,
} from "../repositories/refreshTokenRepository.js";

//회원가입
export async function signup({ email, password, nickname }) {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    const error = new Error("이미 가입된 이메일입니다.");
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return createUser({
    email,
    password: hashedPassword,
    nickname,
  });
}

//로그인
export async function login({ email, password }) {
  const user = await findUserByEmailWithPassword(email);

  if (!user) {
    const error = new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
    error.status = 401;
    throw error;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    const error = new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
    error.status = 401;
    throw error;
  }

  //토큰
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await createRefreshToken({
    token: refreshToken,
    userId: user.id,
    expiresAt,
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    },
  };
}

export async function getMe(userId) {
  const user = await findUserById(userId);

  if (!user) {
    const error = new Error("사용자를 찾을 수 없습니다.");
    error.status = 404;
    throw error;
  }

  return user;
}

export async function refreshAccessToken(refreshToken) {
  if (!refreshToken) {
    const error = new Error("리프레시 토큰이 없습니다.");
    error.status = 401;
    throw error;
  }

  const decoded = verifyRefreshToken(refreshToken);

  const savedToken = await findRefreshToken(refreshToken);

  if (!savedToken) {
    const error = new Error("유효하지 않은 리프레시 토큰입니다.");
    error.status = 401;
    throw error;
  }

  if (savedToken.expiresAt < new Date()) {
    const error = new Error("리프레시 토큰이 만료되었습니다.");
    error.status = 401;
    throw error;
  }

  const user = await findUserById(decoded.id);

  if (!user) {
    const error = new Error("사용자를 찾을 수 없습니다.");
    error.status = 404;
    throw error;
  }

  const accessToken = generateAccessToken(user);

  return {
    accessToken,
  };
}
