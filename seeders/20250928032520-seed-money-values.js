"use strict";
const moneyValuesData = require("../data/money_values.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const formattedData = moneyValuesData.map(moneyValue => ({
      treasure_id: moneyValue.treasure_id,
      amount: moneyValue.amount,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert("money_values", formattedData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("money_values", null, {});
  },
};
