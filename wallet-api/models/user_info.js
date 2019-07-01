'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_info = sequelize.define('user_info', {
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
    email_address: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {});
  user_info.associate = function(models) {
    // associations can be defined here
  };
  return user_info;
};