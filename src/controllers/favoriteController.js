import {
  addFavorite,
  removeFavorite,
  getMyFavorites,
} from "../services/favoriteService.js";

export async function addFavoriteController(req, res, next) {
  try {
    const favorite = await addFavorite(req.user.id, req.params.parkingId);

    return res.status(201).json({
      message: "즐겨찾기에 추가되었습니다.",
      data: favorite,
    });
  } catch (error) {
    next(error);
  }
}

export async function removeFavoriteController(req, res, next) {
  try {
    await removeFavorite(req.user.id, req.params.parkingId);

    return res.status(200).json({
      message: "즐겨찾기가 삭제되었습니다.",
    });
  } catch (error) {
    next(error);
  }
}

export async function getMyFavoritesController(req, res, next) {
  try {
    const favorites = await getMyFavorites(req.user.id);

    return res.status(200).json({
      message: "즐겨찾기 목록 조회에 성공했습니다.",
      data: favorites,
    });
  } catch (error) {
    next(error);
  }
}
