import {
  createFavorite,
  findFavorite,
  deleteFavorite,
  getFavoritesByUserId,
} from "../repositories/favoriteRepository.js";

import { getCachedParkings } from "./parkingService.js";

export async function addFavorite(userId, parkingId) {
  const exists = await findFavorite(userId, parkingId);

  if (exists) {
    const error = new Error("이미 즐겨찾기에 등록된 주차장입니다.");
    error.status = 409;
    throw error;
  }

  return createFavorite(userId, parkingId);
}

export async function removeFavorite(userId, parkingId) {
  const exists = await findFavorite(userId, parkingId);

  if (!exists) {
    const error = new Error("즐겨찾기를 찾을 수 없습니다.");
    error.status = 404;
    throw error;
  }

  return deleteFavorite(userId, parkingId);
}

export async function getMyFavorites(userId) {
  const favorites = await getFavoritesByUserId(userId);
  const parkings = await getCachedParkings();

  return favorites
    .map((favorite) =>
      parkings.find(
        (parking) => String(parking.id) === String(favorite.parkingId),
      ),
    )
    .filter(Boolean);
}
