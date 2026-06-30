import bcrypt from "bcrypt";
import {
  createUser,
  findUserByEmail,
  findUserByEmailWithPassword,
} from "../repositories/userRepository.js";
import { generateAccessToken } from "../utils/token.js";

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

  const accessToken = generateAccessToken(user);

  return {
    accessToken,
    user: {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    },
  };
}
