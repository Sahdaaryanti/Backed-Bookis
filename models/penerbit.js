'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penerbit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Penerbit.hasMany(models.Buku, {foreignKey : 'penerbitId', as:'bukus'})
    }
  }
  Penerbit.init({
    nama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Penerbit',
  });
  return Penerbit;
};