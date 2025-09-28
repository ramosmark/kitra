"use strict";
const { hashPassword } = require("../lib/auth");
const usersData = require("../data/users.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const formattedData = await Promise.all(
      usersData.map(async user => ({
        id: user.id,
        name: user.name,
        age: user.age,
        email: user.email,
        password: await hashPassword({ password: user.password.toString() }),
        created_at: new Date(),
        updated_at: new Date(),
      }))
    );

    await queryInterface.bulkInsert("Users", formattedData, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
