const { User } = require("../models");

const findUser = async ({ email }) => {
  return await User.findOne({ where: { email } });
};

module.exports = { findUser };
