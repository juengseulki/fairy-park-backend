import {
  addParkingHistory,
  getMyParkingHistories,
  removeParkingHistory,
  removeAllParkingHistories,
} from "../services/historyService.js";

export async function addParkingHistoryController(req, res, next) {
  try {
    const history = await addParkingHistory(req.user.id, req.params.parkingId);

    return res.status(201).json({
      message: "최근 조회 기록이 저장되었습니다.",
      data: history,
    });
  } catch (error) {
    next(error);
  }
}

export async function getMyParkingHistoriesController(req, res, next) {
  try {
    const histories = await getMyParkingHistories(req.user.id);

    return res.status(200).json({
      message: "최근 조회 기록 조회에 성공했습니다.",
      data: histories,
    });
  } catch (error) {
    next(error);
  }
}

export async function removeParkingHistoryController(req, res, next) {
  try {
    await removeParkingHistory(req.user.id, req.params.parkingId);

    return res.status(200).json({
      message: "최근 조회 기록이 삭제되었습니다.",
    });
  } catch (error) {
    next(error);
  }
}

export async function removeAllParkingHistoriesController(req, res, next) {
  try {
    await removeAllParkingHistories(req.user.id);

    return res.status(200).json({
      message: "최근 조회 기록이 전체 삭제되었습니다.",
    });
  } catch (error) {
    next(error);
  }
}
