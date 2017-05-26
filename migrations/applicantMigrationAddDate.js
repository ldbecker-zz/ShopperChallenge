'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'Applicants',
        'date',
         Sequelize.DATEONLY
      );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Applicants');
  }
};
