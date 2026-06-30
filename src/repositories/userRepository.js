import prisma from "../config/prisma.js";

export async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser({ email, password, nickname }) {
  return prisma.user.create({
    data: {
      email,
      password,
      nickname,
    },
    select: {
      id: true,
      email: true,
      nickname: true,
      createdAt: true,
    },
  });
}

export async function findUserByEmailWithPassword(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}
