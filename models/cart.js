'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // Define associations
      Cart.belongsTo(models.User, { as: 'user', foreignKey: 'userid' });
      Cart.belongsTo(models.Buku, { as: 'bukus', foreignKey: 'bukuid' });
    }
  }

  Cart.init(
    {
      userid: DataTypes.INTEGER,
      bukuid: DataTypes.INTEGER,
      jumlah: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Cart',
      tableName: 'carts',
    }
  );

  return Cart;
};
