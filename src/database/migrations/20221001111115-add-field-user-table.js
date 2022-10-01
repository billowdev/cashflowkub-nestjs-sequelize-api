
'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires

module.exports = {

  up(queryInterface, Sequelize) {
    return Promise.all([
      // --------------------------------------
      queryInterface.addColumn(
        'user',  // tablename
        'is_premium',
        {
          type: Sequelize.BOOLEAN,
          field: 'is_premium',
          defaultValue: false,
        }
      )
      // --------------------------------------

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      // --------------------------------------
      queryInterface.removeColumn('user', 'is_premium'),
      // --------------------------------------

    ])
  }
};