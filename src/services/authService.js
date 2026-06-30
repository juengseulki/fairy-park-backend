import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../repositories/userRepository.js";

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
