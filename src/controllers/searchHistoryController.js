import {
  addSearchHistory,
  getMySearchHistories,
  removeSearchHistory,
  removeAllSearchHistories,
} from "../services/searchHistoryService.js";
import { getPopularSearchKeywords } from "../services/searchHistoryService.js";

export async function addSearchHistoryController(req, res, next) {
  try {
    const history = await addSearchHistory(req.user.id, req.body.keyword);

    return res.status(201).json({
      message: "검색 기록이 저장되었습니다.",
      data: history,
    });
  } catch (error) {
    next(error);
  }
}

export async function getMySearchHistoriesController(req, res, next) {
  try {
    const histories = await getMySearchHistories(req.user.id);

    return res.status(200).json({
      message: "검색 기록 조회에 성공했습니다.",
      data: histories,
    });
  } catch (error) {
    next(error);
  }
}

export async function removeSearchHistoryController(req, res, next) {
  try {
    await removeSearchHistory(req.user.id, req.params.id);

    return res.status(200).json({
      message: "검색 기록이 삭제되었습니다.",
    });
  } catch (error) {
    next(error);
  }
}

export async function removeAllSearchHistoriesController(req, res, next) {
  try {
    await removeAllSearchHistories(req.user.id);

    return res.status(200).json({
      message: "검색 기록이 전체 삭제되었습니다.",
    });
  } catch (error) {
    next(error);
  }
}

export async function getPopularSearchKeywordsController(req, res, next) {
  try {
    const limit = Number(req.query.limit ?? 10);
    const keywords = await getPopularSearchKeywords(limit);

    return res.status(200).json({
      message: "인기 검색어 조회에 성공했습니다.",
      data: keywords,
    });
  } catch (error) {
    next(error);
  }
}
