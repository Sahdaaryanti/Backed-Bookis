'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pesananItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      pesananItem.belongsTo(models.Buku, {as : 'bukus', foreignKey : 'bukuId'})
      pesananItem.belongsTo(models.detailPesanan, {as : 'detailPesanans', foreignKey : 'pesananId'})
    }
  }
  pesananItem.init({
    pesananId: DataTypes.INTEGER,
    bukuId: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pesananItem',
  });
  return pesananItem;
};