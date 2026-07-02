function isTrue(value) {
  return value === "true" || value === true;
}

function normalizeTime(time) {
  if (!time) return null;

  const text = String(time).replace(":", "").padStart(4, "0");

  if (!/^\d{4}$/.test(text)) return null;

  return text;
}

function getCurrentHHMM() {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${hours}${minutes}`;
}

function isFreeParking(parking) {
  const feeInfo = parking.feeInfo ?? parking.parkingChargeInfo ?? "";

  return feeInfo.includes("무료");
}

function isOpenNow(parking) {
  const currentTime = getCurrentHHMM();

  const openTime = normalizeTime(parking.weekdayOpen);
  const closeTime = normalizeTime(parking.weekdayClose);

  if (!openTime || !closeTime) return false;

  if (openTime === closeTime) return true;

  return openTime <= currentTime && currentTime <= closeTime;
}

function filterByRegion(parkings, region) {
  if (!region) return parkings;

  return parkings.filter((parking) => parking.address?.includes(region));
}

export function applyParkingFilters(parkings, query) {
  let result = [...parkings];

  if (query.region) {
    result = filterByRegion(result, query.region.trim());
  }

  if (isTrue(query.isFree)) {
    result = result.filter(isFreeParking);
  }

  if (isTrue(query.openNow)) {
    result = result.filter(isOpenNow);
  }

  return result;
}

export function applyParkingSort(parkings, query) {
  const sort = query.sort;

  const result = [...parkings];

  if (sort === "name") {
    return result.sort((a, b) => a.name.localeCompare(b.name, "ko"));
  }

  if (sort === "distance") {
    return result.sort(
      (a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity),
    );
  }

  return result;
}
