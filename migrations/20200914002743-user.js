'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'uuid', {
      allowNull: false,
      unique: true,
      type: 'text',
      after: 'id'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'uuid')
  }
}