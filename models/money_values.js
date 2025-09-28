const { sequelize, DataTypes } = require("../lib/db");

const MoneyValue = sequelize.define(
  "MoneyValue",
  {
    treasure_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Treasures",
        key: "id",
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "money_values",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = MoneyValue;
