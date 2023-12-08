'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detailPesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      detailPesanan.belongsTo(models.User, {as : 'users', foreignKey : 'userId'})

      detailPesanan.hasMany(models.pesananItem, {foreignKey : 'pesananId', as:'pesananItems'})
      detailPesanan.hasMany(models.returPesanan, {foreignKey : 'pesananId', as:'returPesanans'})
      detailPesanan.hasMany(models.pesananPayment, {foreignKey : 'pesananId', as:'pesananPayments'})
    }
  }
  detailPesanan.init({
    userId: DataTypes.INTEGER,
    total: DataTypes.DECIMAL(10,2),
    statusPesanan: DataTypes.ENUM('Baru','Proses Packing','Dikirim','Dibatalkan')
  }, {
    sequelize,
    modelName: 'detailPesanan',
  });
  return detailPesanan;
};