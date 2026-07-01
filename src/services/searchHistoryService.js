import {
  upsertSearchHistory,
  getSearchHistoriesByUserId,
  deleteSearchHistory,
  deleteAllSearchHistories,
} from "../repositories/searchHistoryRepository.js";

export async function addSearchHistory(userId, keyword) {
  const trimmedKeyword = keyword?.trim();

  if (!trimmedKeyword) {
    const error = new Error("검색어를 입력해 주세요.");
    error.status = 400;
    throw error;
  }

  return upsertSearchHistory(userId, trimmedKeyword);
}

export async function getMySearchHistories(userId) {
  return getSearchHistoriesByUserId(userId);
}

export async function removeSearchHistory(userId, id) {
  return deleteSearchHistory(userId, id);
}

export async function removeAllSearchHistories(userId) {
  return deleteAllSearchHistories(userId);
}
