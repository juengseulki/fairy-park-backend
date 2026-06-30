export function mapParkingList(items) {
  const parkingList = Array.isArray(items) ? items : [items];

  return parkingList.map((parking) => ({
    id: parking.prkplceNo,
    name: parking.prkplceNm,
    address: parking.rdnmadr || parking.lnmadr,
    latitude: Number(parking.latitude),
    longitude: Number(parking.longitude),
    capacity: Number(parking.prkcmprt),
    feeInfo: parking.parkingchrgeInfo,
    weekdayOpen: parking.weekdayOperOpenHhmm,
    weekdayClose: parking.weekdayOperColseHhmm,
    phone: parking.phoneNumber,
  }));
}
