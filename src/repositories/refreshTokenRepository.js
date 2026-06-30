import prisma from "../config/prisma.js";

export async function createRefreshToken({ token, userId, expiresAt }) {
  return prisma.refreshToken.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });
}

export async function findRefreshToken(token) {
  return prisma.refreshToken.findUnique({
    where: { token },
  });
}
