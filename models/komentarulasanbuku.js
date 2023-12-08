'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class komentarUlasanBuku extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      komentarUlasanBuku.belongsTo(models.ulasanBuku, {as : 'ulasanBukus', foreignKey : 'ulasanBukuId'})
      komentarUlasanBuku.belongsTo(models.User, {as : 'users', foreignKey : 'userId'})
    }
  }
  komentarUlasanBuku.init({
    ulasanBukuId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    komentar: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'komentarUlasanBuku',
  });
  return komentarUlasanBuku;
};