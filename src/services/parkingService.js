import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { mapParkingList } from "../utils/parkingMapper.js";
import { calculateDistanceKm } from "../utils/distance.js";
import {
  applyParkingFilters,
  applyParkingSort,
} from "../utils/parkingFilter.js";

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

export async function getCachedParkings() {
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

  return parkings.filter((parking) => parking.name?.includes(keyword));
}

export async function getParkings(query) {
  const pageNo = Number(query.pageNo ?? DEFAULT_PAGE_NO);
  const numOfRows = Number(query.numOfRows ?? DEFAULT_NUM_OF_ROWS);
  const keyword = query.keyword?.trim();

  if (keyword || query.isFree || query.openNow || query.sort) {
    const allParkings = await getCachedParkings();

    let result = filterParkingsByKeyword(allParkings, keyword);

    result = applyParkingFilters(result, query);
    result = applyParkingSort(result, query);

    return {
      items: result,
      meta: {
        pageNo: 1,
        numOfRows: result.length,
        totalCount: result.length,
      },
    };
  }

  const items = await fetchParkingPage(pageNo, numOfRows);

  let mappedItems = mapParkingList(items);

  mappedItems = applyParkingFilters(mappedItems, query);
  mappedItems = applyParkingSort(mappedItems, query);

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

  return parking;
}

export async function getNearbyParkings(query) {
  const lat = Number(query.lat);
  const lng = Number(query.lng);
  const radius = Number(query.radius ?? 3);
  const limit = Number(query.limit ?? 20);

  if (!lat || !lng) {
    const error = new Error("위도와 경도는 필수입니다.");
    error.status = 400;
    throw error;
  }

  const allParkings = await getCachedParkings();

  let nearbyParkings = allParkings
    .filter((parking) => parking.latitude && parking.longitude)
    .map((parking) => {
      const distanceKm = calculateDistanceKm(
        lat,
        lng,
        parking.latitude,
        parking.longitude,
      );

      return {
        ...parking,
        distanceKm: Number(distanceKm.toFixed(2)),
      };
    })
    .filter((parking) => parking.distanceKm <= radius);

  nearbyParkings = applyParkingFilters(nearbyParkings, query);
  nearbyParkings = applyParkingSort(nearbyParkings, {
    ...query,
    sort: query.sort ?? "distance",
  });

  nearbyParkings = nearbyParkings.slice(0, limit);

  return {
    items: nearbyParkings,
    meta: {
      lat,
      lng,
      radius,
      limit,
      totalCount: nearbyParkings.length,
    },
  };
}

export async function refreshParkingCache() {
  const allItems = await fetchAllParkings();

  parkingCache = mapParkingList(allItems);
  parkingCacheTime = Date.now();

  return {
    totalCount: parkingCache.length,
    refreshedAt: new Date(),
  };
}
