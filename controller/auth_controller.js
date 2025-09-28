const { BadRequestError, UnauthorizedError } = require("../lib/errors");
//
const { findUser } = require("../services/user_services");
const { login, logout, refreshToken } = require("../services/auth_services");
const { CONSTANTS, ERRORS } = require("../lib/constants");

const _login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new BadRequestError(CONSTANTS.CREDENTIALS_REQUIRED);
    }

    const user = await findUser({ email });
    if (!user) throw new UnauthorizedError(CONSTANTS.INVALID_CREDENTIALS);

    const { accessToken, refreshToken } = await login({ password, user });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || ERRORS.INTERNAL_SERVER,
    });
  }
};

const _logout = async (req, res) => {
  const { id: userId } = req.user;

  try {
    await logout({ userId });
    res.json({ message: CONSTANTS.LOGOUT_SUCCESS });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || ERRORS.INTERNAL_SERVER,
    });
  }
};

const _refreshToken = async (req, res) => {
  const { refreshToken: token } = req.body;

  try {
    if (!token) {
      throw new BadRequestError(ERROR.UnauthorizedError);
    }

    const { accessToken, refreshToken: newRefreshToken } = await refreshToken({
      token,
    });

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || ERRORS.INTERNAL_SERVER,
    });
  }
};

module.exports = { _login, _logout, _refreshToken };
