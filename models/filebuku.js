'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fileBuku extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      fileBuku.belongsTo(models.Buku, {as : 'bukus', foreignKey : 'bukuId'})
    }
  }
  fileBuku.init({
    bukuId: DataTypes.INTEGER,
    urlFile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'fileBuku',
  });
  return fileBuku;
};