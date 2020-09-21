"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", "uuid", {
      allowNull: false,
      unique: true,
      type: "bytea",
      after: "id",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("users", "uuid");
  },
};
