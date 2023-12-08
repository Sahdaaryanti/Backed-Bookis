'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ulasanBuku extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ulasanBuku.belongsTo(models.Buku, {as : 'bukus', foreignKey : 'bukuId'})
      ulasanBuku.belongsTo(models.User, {as : 'users', foreignKey : 'userId'})

      ulasanBuku.hasMany(models.fileUlasanBuku, {foreignKey : 'ulasanBukuId', as:'fileUlasanBukus'})
    }
  }
  ulasanBuku.init({
    bukuId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    rating: DataTypes.DECIMAL,
    komentar: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ulasanBuku',
  });
  return ulasanBuku;
};