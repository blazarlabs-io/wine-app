export const normalizeData = (polygon: google.maps.Polygon) => {
  var coordinates: any[] = polygon.getPath().getArray();

  const normalCoordinates = coordinates.map((coord) => {
    return { lat: coord.lat(), lng: coord.lng() };
  });

  return normalCoordinates;
};
