'use strict';
const treasuresData = require("../data/treasures.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const formattedData = treasuresData.map(treasure => ({
      id: treasure.id,
      name: treasure.Name,
      latitude: treasure.latitude,
      longitude: treasure.longtitude,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert("Treasures", formattedData, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Treasures", null, {});
  }
};
