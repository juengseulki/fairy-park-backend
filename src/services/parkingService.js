import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { mapParkingList, mapParkingDetail } from "../utils/parkingMapper.js";

const parser = new XMLParser({
  ignoreAttributes: false,
});

export async function getParkings(query) {
  const pageNo = query.pageNo ?? 1;
  const numOfRows = query.numOfRows ?? 20;

  const response = await axios.get(process.env.PARKING_API_URL, {
    params: {
      serviceKey: process.env.PARKING_API_KEY,
      pageNo,
      numOfRows,
      type: "xml",
    },
  });

  const parsed = parser.parse(response.data);

  const items = parsed.response?.body?.items?.item ?? [];

  return mapParkingList(items);
}

export async function getParkingDetail(id) {
  const response = await axios.get(process.env.PARKING_API_URL, {
    params: {
      serviceKey: process.env.PARKING_API_KEY,
      pageNo: 1,
      numOfRows: 1000,
      type: "xml",
    },
  });

  const parsed = parser.parse(response.data);
  const items = parsed.response?.body?.items?.item ?? [];

  const parkingList = Array.isArray(items) ? items : [items];

  const parking = parkingList.find(
    (item) => String(item.prkplceNo) === String(id),
  );

  if (!parking) {
    const error = new Error("주차장 정보를 찾을 수 없습니다.");
    error.status = 404;
    throw error;
  }

  return mapParkingDetail(parking);
}
