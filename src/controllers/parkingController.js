import { getParkings, getParkingDetail } from "../services/parkingService.js";

export async function getParkingsController(req, res, next) {
  try {
    const data = await getParkings(req.query);

    return res.status(200).json({
      message: "주차장 목록 조회에 성공했습니다.",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getParkingDetailController(req, res, next) {
  try {
    const parking = await getParkingDetail(req.params.id);

    return res.status(200).json({
      message: "주차장 상세 조회에 성공했습니다.",
      data: parking,
    });
  } catch (error) {
    next(error);
  }
}
