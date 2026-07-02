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
      count: {
        increment: 1,
      },
    },
    create: {
      userId,
      keyword,
      count: 1,
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

export async function getPopularSearchHistories(limit = 10) {
  return prisma.searchHistory.groupBy({
    by: ["keyword"],
    _sum: {
      count: true,
    },
    orderBy: {
      _sum: {
        count: "desc",
      },
    },
    take: limit,
  });
}
