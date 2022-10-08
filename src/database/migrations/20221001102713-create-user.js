
'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { UUIDV4 } = require("sequelize");

module.exports = {
  up: async (queryInterface, DataType) => {
    return queryInterface.createTable('user', {

      id: {
        type: DataType.UUID,
        defaultValue: UUIDV4,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataType.STRING(100),
        allowNull: false,
      },
      hash_password: {
        type: DataType.STRING(100),
        field: 'hash_password',
        allowNull: false,
      },
      firstName: {
        field: 'first_name',
        type: DataType.STRING(150),
      },
      lastName: {
        field: 'last_name',
        type: DataType.STRING(150),
      },
      email: {
        type: DataType.STRING(200),
      },
      isActive: {
        type: DataType.BOOLEAN,
        field: 'is_active',
        defaultValue: true,
      }

    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};