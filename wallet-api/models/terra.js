'use strict';
module.exports = (sequelize, DataTypes) => {
  const terra = sequelize.define('terra', {
    user_name: DataTypes.STRING,
    balance: DataTypes.FLOAT
  }, {});
  terra.associate = function(models) {
    // associations can be defined here
  };
  return terra;
};