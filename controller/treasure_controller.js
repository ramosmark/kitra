const { BadRequestError } = require("../lib/errors");
const { CONSTANTS, ERRORS } = require("../lib/constants");
const { findTreasures, getTreasures } = require("../services/treasure_services");
const { getMoneyValues } = require("../services/money_value_services");

const _findTreasures = async (req, res) => {
  const { latitude, longitude, distance, minValue, maxValue } = req.query;

  try {
    if (!latitude || !longitude || !distance) {
      throw new BadRequestError(CONSTANTS.REQUIRED_LONG_LAT_DIST);
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const dist = parseInt(distance);

    if (isNaN(lat) || isNaN(lon) || isNaN(dist)) {
      throw new BadRequestError(CONSTANTS.INVALID_LONG_LAT_DIST);
    }

    if (lat < -90 || lat > 90) {
      throw new BadRequestError(CONSTANTS.INVALID_LATITUDE);
    }

    if (lon < -180 || lon > 180) {
      throw new BadRequestError(CONSTANTS.INVALID_LONGITUDE);
    }

    if (dist !== 1 && dist !== 10) {
      throw new BadRequestError(INVALID_DISTANCE);
    }

    if (minValue && !Number.isInteger(Number(minValue))) {
      throw new BadRequestError(CONSTANTS.INVALID_MIN_PRIZE_VALUE);
    }

    if (maxValue && !Number.isInteger(Number(maxValue))) {
      throw new BadRequestError(CONSTANTS.INVALID_MAX_PRIZE_VALUE);
    }

    if ((minValue && !maxValue) || (!minValue && maxValue)) {
      throw new BadRequestError(CONSTANTS.INVALID_PRIZE_VALUE);
    }

    if (minValue) {
      const minVal = Number(minValue);
      
      if (minVal < 10 || minVal > 30) {
        throw new BadRequestError(CONSTANTS.INVALID_MIN_PRIZE_VALUE_RANGE);
      }
    }

    if (minValue && maxValue) {
      const minVal = Number(minValue);
      const maxVal = Number(maxValue);

      if (maxVal <= minVal) {
        throw new BadRequestError(CONSTANTS.INVALID_MAX_PRIZE_VALUE_RANGE);
      }
    }

    const treasures = await findTreasures({
      latitude: lat,
      longitude: lon,
      distance: dist,
    });

    let _treasures = treasures;

    if (minValue && maxValue) {
      const treasureIds = treasures.map(treasure => treasure.id);

      const moneyValues = await getMoneyValues({
        treasureIds,
        minValue,
        maxValue,
      });

      _treasures = treasures
        .map(treasure => {
          const moneyValue = moneyValues.find(
            mv => mv.treasure_id === treasure.id
          );
          return {
            ...treasure,
            amount: moneyValue ? moneyValue.amount : null,
          };
        })
        .filter(treasure => treasure.amount !== null);
    }

    res.json({
      treasures: _treasures,
      count: _treasures.length,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || ERRORS.INTERNAL_SERVER,
    });
  }
};

module.exports = { _findTreasures };
