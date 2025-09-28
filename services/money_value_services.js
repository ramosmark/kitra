const { sequelize } = require("../lib/db");
//
const MoneyValue = require("../models/money_values");

const getMoneyValues = async ({ treasureIds, minValue, maxValue }) => {
  try {
    if (!treasureIds || treasureIds.length === 0) {
      return [];
    }

    const results = await sequelize.query(
      `
    SELECT mv.*
    FROM money_values mv
    INNER JOIN (
      SELECT treasure_id, MIN(amount) AS min_amount
      FROM money_values
      WHERE treasure_id IN (:ids)
        AND amount >= :minVal
        AND amount <= :maxVal
      GROUP BY treasure_id
    ) AS sub ON mv.treasure_id = sub.treasure_id AND mv.amount = sub.min_amount
  `,
      {
        replacements: {
          ids: treasureIds,
          minVal: minValue,
          maxVal: maxValue,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = { getMoneyValues };
