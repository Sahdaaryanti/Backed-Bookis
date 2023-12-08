'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pesananPayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      pesananPayment.belongsTo(models.detailPesanan, {as : 'detailPesanans', foreignKey : 'pesananId'})
    }
  }
  pesananPayment.init({
    pesananId: DataTypes.INTEGER,
    provider: DataTypes.STRING,
    statusBayar: DataTypes.ENUM('Sudah Dibayar','Belum Dibayar')
  }, {
    sequelize,
    modelName: 'pesananPayment',
  });
  return pesananPayment;
};