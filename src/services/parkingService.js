import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { mapParkingList, mapParkingDetail } from "../utils/parkingMapper.js";

const parser = new XMLParser({
  ignoreAttributes: false,
});

const DEFAULT_PAGE_NO = 1;
const DEFAULT_NUM_OF_ROWS = 20;
const MAX_NUM_OF_ROWS = 1000;
const CACHE_TTL = 1000 * 60 * 60; // 1시간

let parkingCache = null;
let parkingCacheTime = null;

async function fetchParkingPage(pageNo, numOfRows) {
  const response = await axios.get(process.env.PARKING_API_URL, {
    params: {
      serviceKey: process.env.PARKING_API_KEY,
      pageNo,
      numOfRows,
      type: "xml",
    },
  });

  const parsed = parser.parse(response.data);
  const body = parsed.response?.body;
  const rawItems = body?.items?.item ?? [];

  const items = Array.isArray(rawItems) ? rawItems : [rawItems];

  return items;
}

async function fetchAllParkings() {
  const allItems = [];
  let pageNo = 1;

  while (true) {
    const items = await fetchParkingPage(pageNo, MAX_NUM_OF_ROWS);

    if (items.length === 0) break;

    allItems.push(...items);

    if (items.length < MAX_NUM_OF_ROWS) break;

    pageNo += 1;
  }

  return allItems;
}

async function getCachedParkings() {
  const now = Date.now();

  const isCacheValid =
    parkingCache && parkingCacheTime && now - parkingCacheTime < CACHE_TTL;

  if (isCacheValid) {
    return parkingCache;
  }

  const allItems = await fetchAllParkings();

  parkingCache = mapParkingList(allItems);
  parkingCacheTime = now;

  return parkingCache;
}

function filterParkingsByKeyword(parkings, keyword) {
  if (!keyword) return parkings;

  return parkings.filter((parking) =>
    [parking.name, parking.address].some((value) => value?.includes(keyword)),
  );
}

export async function getParkings(query) {
  const pageNo = Number(query.pageNo ?? DEFAULT_PAGE_NO);
  const numOfRows = Number(query.numOfRows ?? DEFAULT_NUM_OF_ROWS);
  const keyword = query.keyword?.trim();

  if (keyword) {
    const allParkings = await getCachedParkings();
    const filteredParkings = filterParkingsByKeyword(allParkings, keyword);

    return {
      items: filteredParkings,
      meta: {
        pageNo: 1,
        numOfRows: filteredParkings.length,
        totalCount: filteredParkings.length,
      },
    };
  }

  const items = await fetchParkingPage(pageNo, numOfRows);
  const mappedItems = mapParkingList(items);

  return {
    items: mappedItems,
    meta: {
      pageNo,
      numOfRows,
      totalCount: mappedItems.length,
    },
  };
}

export async function getParkingDetail(id) {
  const allParkings = await getCachedParkings();

  const parking = allParkings.find((item) => String(item.id) === String(id));

  if (!parking) {
    const error = new Error("주차장 정보를 찾을 수 없습니다.");
    error.status = 404;
    throw error;
  }

  return mapParkingDetail(parking);
}
