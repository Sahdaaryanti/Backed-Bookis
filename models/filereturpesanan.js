'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fileReturPesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      fileReturPesanan.belongsTo(models.returPesanan, {as : 'returPesanans', foreignKey : 'returPesananId'})
    }
  }
  fileReturPesanan.init({
    returPesananId: DataTypes.INTEGER,
    urlFile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'fileReturPesanan',
  });
  return fileReturPesanan;
};