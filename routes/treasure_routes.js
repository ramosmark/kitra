const express = require("express");
const router = express.Router();
const { _findTreasures } = require("../controller/treasure_controller");
const { authenticateToken } = require("../lib/auth");

router.get("", authenticateToken, _findTreasures);

module.exports = router;
