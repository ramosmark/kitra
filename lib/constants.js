const ERRORS = {
  VALIDATION: "Validation Error",
  UNAUTHORIZED: "Unauthorized Error",
  INTERNAL_SERVER: "Internal server error",
  TOKEN_EXPIRED: "TokenExpiredError",
  TOKEN_ERROR: "JsonWebTokenError",
  TOKEN_REQUIRED: 'Token required',
  INVALID_EXPIRED_TOKEN: "Invalid or expired refresh token",
};

const CONSTANTS = {
  INVALID_CREDENTIALS: "Invalid email or password",
  CREDENTIALS_REQUIRED: "Email and password are required",
  REQUIRED_LONG_LAT_DIST: "Latitude, longitude, and distance are required",
  INVALID_MIN_PRIZE_VALUE: "Minimum Prize value must be valid integer",
  INVALID_MAX_PRIZE_VALUE: "Maximum Prize value must be valid integer",
  INVALID_MIN_PRIZE_VALUE_RANGE: "Minimum Prize value must be between 10 and 30",
  INVALID_MAX_PRIZE_VALUE_RANGE: "Maximum Prize value must be greater than minimum value",
  INVALID_LATITUDE: "Latitude must be between -90 and 90",
  INVALID_LONGITUDE: "Longitude must be between -180 and 180",
  INVALID_LONG_LAT_DIST: "Latitude, longitude, distance must be valid numbers",
  INVALID_DISTANCE: "Distance must be either 1 or 10 km",
  INVALID_PRIZE_VALUE: "Minimum and Maximum value are required",
  LOGIN_SUCCESS: "Login Successful",
  LOGOUT_SUCCESS: "Logout Successful",
};

module.exports = { ERRORS, CONSTANTS };
