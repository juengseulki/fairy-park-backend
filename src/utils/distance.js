export function calculateDistanceKm(lat1, lng1, lat2, lng2) {
  const earthRadiusKm = 6371;

  const toRadian = (degree) => (degree * Math.PI) / 180;

  const dLat = toRadian(lat2 - lat1);
  const dLng = toRadian(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadian(lat1)) *
      Math.cos(toRadian(lat2)) *
      Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}
