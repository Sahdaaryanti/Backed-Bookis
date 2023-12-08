'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kategori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Kategori.hasMany(models.Buku, {foreignKey : 'kategoriId', as:'bukus'})
    }
  }
  Kategori.init({
    nama: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Kategori',
  });
  return Kategori;
};