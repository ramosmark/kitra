const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//
const { User } = require("../models");
const { ERRORS } = require("./constants");

require("dotenv").config();

const pepper = process.env.PASSWORD_PEPPER;

const generateAccessToken = ({ user }) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
  });
};

const generateRefreshToken = ({ user }) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
  });
};

const hashPassword = async ({ password }) => {
  const salted = password + pepper;
  const hash = await bcrypt.hash(salted, 12);
  return hash;
};

const verifyPassword = async ({ password, hashedPassword }) => {
  const salted = password + pepper;
  return await bcrypt.compare(salted, hashedPassword);
};

const saveRefreshToken = async ({ userId, refreshToken }) => {
  await User.update({ refreshToken }, { where: { id: userId } });
};

const clearRefreshToken = async ({ userId }) => {
  await User.update({ refreshToken: null }, { where: { id: userId } });
};

const getUserByRefreshToken = async ({ refreshToken }) => {
  return await User.findOne({ where: { refreshToken } });
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(400).json({
      success: false,
      message: ERRORS.TOKEN_REQUIRED,
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: ERRORS.INVALID_EXPIRED_TOKEN,
      });
    }
    req.user = user;
    next();
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  verifyPassword,
  saveRefreshToken,
  clearRefreshToken,
  getUserByRefreshToken,
  authenticateToken,
};
