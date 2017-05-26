'use strict';
module.exports = function(sequelize, DataTypes) {
  var Applicants = sequelize.define('Applicants', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    region: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_type: DataTypes.STRING,
    source: DataTypes.STRING,
    over_21: DataTypes.BOOLEAN,
    reason: DataTypes.STRING,
    workflow_state: DataTypes.STRING,
    date: DataTypes.DATEONLY
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Applicants;
};