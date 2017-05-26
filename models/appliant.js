'use strict';
module.exports = function(sequelize, DataTypes) {
  var Kitchen = sequelize.define('Kitchen', {
    name: DataTypes.STRING,
    numberOvens: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Kitchen;
};