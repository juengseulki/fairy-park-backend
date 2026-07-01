import {
  upsertParkingHistory,
  getHistoriesByUserId,
  deleteParkingHistory,
  deleteAllParkingHistories,
} from "../repositories/historyRepository.js";

import { getCachedParkings } from "./parkingService.js";

export async function addParkingHistory(userId, parkingId) {
  const parkings = await getCachedParkings();

  const parking = parkings.find(
    (parking) => String(parking.id) === String(parkingId),
  );

  if (!parking) {
    const error = new Error("주차장 정보를 찾을 수 없습니다.");
    error.status = 404;
    throw error;
  }

  return upsertParkingHistory(userId, parkingId);
}

export async function getMyParkingHistories(userId) {
  const histories = await getHistoriesByUserId(userId);
  const parkings = await getCachedParkings();

  return histories
    .map((history) => {
      const parking = parkings.find(
        (parking) => String(parking.id) === String(history.parkingId),
      );

      if (!parking) return null;

      return {
        ...parking,
        viewedAt: history.viewedAt,
      };
    })
    .filter(Boolean);
}

export async function removeParkingHistory(userId, parkingId) {
  return deleteParkingHistory(userId, parkingId);
}

export async function removeAllParkingHistories(userId) {
  return deleteAllParkingHistories(userId);
}
