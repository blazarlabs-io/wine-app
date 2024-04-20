export const getPolygonCenter = (coords: any) => {
  console.log("coords", coords);
  let centerX = 0,
    centerY = 0;

  // Iterate through each coordinate pair
  for (let i = 0; i < coords.length; i++) {
    // Add current coordinate to centroid accumulators
    centerX += coords[i].lat;
    centerY += coords[i].lng;
  }

  // Calculate the centroid coordinates
  centerX /= coords.length;
  centerY /= coords.length;

  // Return the centroid as an object
  return { lat: centerX, lng: centerY };
};
