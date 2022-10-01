
'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires

module.exports = {

  up(queryInterface, Sequelize) {
    return Promise.all([
      // --------------------------------------
      queryInterface.addColumn(
        'user',  // tablename
        'phone',
        {
          type: Sequelize.STRING(10),
          field: 'phone',
          defaultValue: false,
        }
      )
      // --------------------------------------

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      // --------------------------------------
      queryInterface.removeColumn('user', 'phone'),
      // --------------------------------------

    ])
  }
};