'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fileUlasanBuku extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      fileUlasanBuku.belongsTo(models.ulasanBuku, {as : 'ulasanBukus', foreignKey : 'ulasanBukuId'})
    }
  }
  fileUlasanBuku.init({
    ulasanBukuId: DataTypes.INTEGER,
    urlFile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'fileUlasanBuku',
  });
  return fileUlasanBuku;
};