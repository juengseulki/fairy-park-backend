import prisma from "../config/prisma.js";

export async function upsertSearchHistory(userId, keyword) {
  return prisma.searchHistory.upsert({
    where: {
      userId_keyword: {
        userId,
        keyword,
      },
    },
    update: {
      searchedAt: new Date(),
    },
    create: {
      userId,
      keyword,
    },
  });
}

export async function getSearchHistoriesByUserId(userId) {
  return prisma.searchHistory.findMany({
    where: { userId },
    orderBy: {
      searchedAt: "desc",
    },
  });
}

export async function deleteSearchHistory(userId, id) {
  return prisma.searchHistory.deleteMany({
    where: {
      id,
      userId,
    },
  });
}

export async function deleteAllSearchHistories(userId) {
  return prisma.searchHistory.deleteMany({
    where: { userId },
  });
}
