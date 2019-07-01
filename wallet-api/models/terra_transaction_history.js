'use strict';
module.exports = (sequelize, DataTypes) => {
  const terra_transaction_history = sequelize.define('terra_transaction_history', {
    sender: DataTypes.STRING,
    receiver: DataTypes.STRING,
    amount: DataTypes.FLOAT
  }, {});
  terra_transaction_history.associate = function(models) {
    // associations can be defined here
  };
  return terra_transaction_history;
};