const express = require("express");
const router = express.Router();
//
const {
  _login,
  _logout,
  _refreshToken,
} = require("../controller/auth_controller");
//
const { authenticateToken } = require("../lib/auth");

router
  .post("/login", _login)
  .post("/logout", authenticateToken, _logout)
  .post("/refresh", _refreshToken);

module.exports = router;
