'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class userPayment extends Model {
    static associate(models) {
      userPayment.belongsTo(models.detailUser, { as: 'detailUsers', foreignKey: 'detailUserId' });
    }
  }

  userPayment.init(
    {
      detailUserId: DataTypes.CHAR(),
      provider: DataTypes.STRING,
      noPayment: DataTypes.CHAR(25),
    },
    {
      sequelize,
      modelName: 'userPayment',
    }
  );
  return userPayment;
};
