'use strict';
import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn('user', 'image', {
      type: DataTypes.STRING(),
      defaultValue: '-'
    })
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('user', 'image')
  }
};
