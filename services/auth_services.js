const {
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
  saveRefreshToken,
  clearRefreshToken,
  getUserByRefreshToken,
} = require("../lib/auth");
const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../lib/errors");
const { CONSTANTS, ERRORS } = require("../lib/constants");

const login = async ({ password, user }) => {
  try {
    const isPasswordValid = await verifyPassword({
      password,
      hashedPassword: user.password,
    });

    if (!isPasswordValid) {
      throw new UnauthorizedError(CONSTANTS.INVALID_CREDENTIALS);
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const accessToken = generateAccessToken({ user: payload });
    const refreshToken = generateRefreshToken({ user: payload });

    await saveRefreshToken({ userId: user.id, refreshToken });

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

const logout = async ({ userId }) => {
  try {
    await clearRefreshToken({ userId });
  } catch (error) {
    throw error;
  }
};

const refreshToken = async ({ token }) => {
  try {
    const user = await getUserByRefreshToken({ refreshToken: token });
    if (!user) {
      throw new UnauthorizedError(ERRORS.UNAUTHORIZED);
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const accessToken = generateAccessToken({ user: payload });
    const newRefreshToken = generateRefreshToken({ user: payload });

    await saveRefreshToken({ userId: user.id, refreshToken: newRefreshToken });

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    if (
      error.name === ERRORS.TOKEN_ERROR ||
      error.name === ERRORS.TOKEN_EXPIRED
    ) {
      throw new UnauthorizedError(ERRORS.UNAUTHORIZED);
    }
    throw error;
  }
};

module.exports = { login, logout, refreshToken };
