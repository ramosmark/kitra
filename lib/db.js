const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("kitra_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = { sequelize, DataTypes };
