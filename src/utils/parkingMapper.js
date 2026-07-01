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

export function mapParkingDetail(parking) {
  return {
    id: parking.prkplceNo,
    name: parking.prkplceNm,
    address: parking.rdnmadr || parking.lnmadr,
    roadAddress: parking.rdnmadr,
    lotAddress: parking.lnmadr,
    latitude: Number(parking.latitude),
    longitude: Number(parking.longitude),
    capacity: Number(parking.prkcmprt),
    feeInfo: parking.parkingchrgeInfo,
    basicTime: parking.basicTime,
    basicCharge: parking.basicCharge,
    addUnitTime: parking.addUnitTime,
    addUnitCharge: parking.addUnitCharge,
    weekdayOpen: parking.weekdayOperOpenHhmm,
    weekdayClose: parking.weekdayOperColseHhmm,
    satOpen: parking.satOperOperOpenHhmm,
    satClose: parking.satOperCloseHhmm,
    holidayOpen: parking.holidayOperOpenHhmm,
    holidayClose: parking.holidayCloseOpenHhmm,
    phone: parking.phoneNumber,
    institution: parking.institutionNm,
    updatedAt: parking.referenceDate,
  };
}
