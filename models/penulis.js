'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penulis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Penulis.hasMany(models.Buku, {foreignKey : 'penulisId', as:'bukus'})
    }
  }
  Penulis.init({
    nama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Penulis',
  });
  return Penulis;
};