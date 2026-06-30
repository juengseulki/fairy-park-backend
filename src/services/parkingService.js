import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { mapParkingList } from "../utils/parkingMapper.js";

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
