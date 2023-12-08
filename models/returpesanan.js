'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class returPesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      returPesanan.belongsTo(models.detailPesanan, {as : 'detailPesanans', foreignKey : 'pesananId'})

      returPesanan.hasMany(models.fileReturPesanan, {foreignKey : 'returPesananId', as:'fileReturPesanans'})
    }
  }
  returPesanan.init({
    pesananId: DataTypes.INTEGER,
    deskripsi: DataTypes.TEXT,
    statusRetur: DataTypes.ENUM('Proses Review','Disetujui','Dikirim','Tidak Disetujui')
  }, {
    sequelize,
    modelName: 'returPesanan',
  });
  return returPesanan;
};