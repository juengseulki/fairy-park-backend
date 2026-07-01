import prisma from "../config/prisma.js";

export async function upsertParkingHistory(userId, parkingId) {
  return prisma.parkingHistory.upsert({
    where: {
      userId_parkingId: {
        userId,
        parkingId,
      },
    },
    update: {
      viewedAt: new Date(),
    },
    create: {
      userId,
      parkingId,
    },
  });
}

export async function getHistoriesByUserId(userId) {
  return prisma.parkingHistory.findMany({
    where: { userId },
    orderBy: {
      viewedAt: "desc",
    },
  });
}

export async function deleteParkingHistory(userId, parkingId) {
  return prisma.parkingHistory.deleteMany({
    where: {
      userId,
      parkingId,
    },
  });
}

export async function deleteAllParkingHistories(userId) {
  return prisma.parkingHistory.deleteMany({
    where: { userId },
  });
}
