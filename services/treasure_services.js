const Treasure = require("../models/treasure");

const findTreasures = async ({ latitude, longitude, distance, value }) => {
  const treasures = await Treasure.findAll();

  const filteredTreasures = treasures.filter(treasure => {
    const treasureDistance = calculateDistance(
      latitude,
      longitude,
      treasure.latitude,
      treasure.longitude,
      value
    );
    return treasureDistance <= distance;
  });

  return filteredTreasures.map(treasure => ({
    id: treasure.id,
    name: treasure.name,
    latitude: treasure.latitude,
    longitude: treasure.longitude,
    distance: Number(
      calculateDistance(
        latitude,
        longitude,
        treasure.latitude,
        treasure.longitude
      ).toFixed(2)
    ),
  }));
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // Earth's radius in kilometers
  const R = 6371;

  // Convert latitude and longitude differences to radians
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  // Haversine formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  // Calculate the angular distance in radians
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Return the distance in kilometers
  return R * c;
};

const toRadians = degrees => {
  return degrees * (Math.PI / 180);
};

module.exports = { findTreasures };
