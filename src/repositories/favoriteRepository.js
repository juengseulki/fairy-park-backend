import prisma from "../config/prisma.js";

export async function createFavorite(userId, parkingId) {
  return prisma.favorite.create({
    data: {
      userId,
      parkingId,
    },
  });
}

export async function findFavorite(userId, parkingId) {
  return prisma.favorite.findUnique({
    where: {
      parkingId_userId: {
        parkingId,
        userId,
      },
    },
  });
}

export async function deleteFavorite(userId, parkingId) {
  return prisma.favorite.delete({
    where: {
      parkingId_userId: {
        parkingId,
        userId,
      },
    },
  });
}

export async function getFavoritesByUserId(userId) {
  return prisma.favorite.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
