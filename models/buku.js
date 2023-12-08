'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Buku extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      'use strict';
      const {
        Model
      } = require('sequelize');
      module.exports = (sequelize, DataTypes) => {
        class Buku extends Model {
          /**
           * Helper method for defining associations.
           * This method is not a part of Sequelize lifecycle.
           * The `models/index` file will call this method automatically.
           */
          static associate(models) {
            Buku.belongsTo(models.Penulis, {as : 'penulis', foreignKey : 'penulisId'})
            Buku.belongsTo(models.Penerbit, {as : 'penerbits', foreignKey : 'penerbitId'})
            Buku.belongsTo(models.Kategori, {as : 'kategoris', foreignKey : 'kategoriId'})
      
            Buku.hasMany(models.Gudang, {foreignKey : 'bukuId', as:'gudangs'})
            Buku.hasMany(models.fileBuku, {foreignKey : 'bukuId', as:'fileBukus'})
            Buku.hasMany(models.pesananItem, {foreignKey : 'bukuId', as:'pesananItems'})
            Buku.hasMany(models.ulasanBuku, {foreignKey : 'bukuId', as:'ulasanBukus'})
          }
        }
        Buku.init({
          penulisId: DataTypes.INTEGER,
          penerbitId: DataTypes.INTEGER,
          kategoriId: DataTypes.INTEGER,
          judul: DataTypes.STRING,
          harga: DataTypes.DECIMAL(10,2),
          isbn: DataTypes.CHAR(13),
          tahunTerbit: DataTypes.CHAR(4)
        }, {
          sequelize,
          modelName: 'Buku',
        });
        return Buku;
      };    Buku.belongsTo(models.Penulis, {as : 'penulis', foreignKey : 'penulisId'})
      Buku.belongsTo(models.Penerbit, {as : 'penerbits', foreignKey : 'penerbitId'})
      Buku.belongsTo(models.Kategori, {as : 'kategoris', foreignKey : 'kategoriId'})

      Buku.hasMany(models.Gudang, {foreignKey : 'bukuId', as:'gudangs'})
      Buku.hasMany(models.fileBuku, {foreignKey : 'bukuId', as:'fileBukus'})
      Buku.hasMany(models.pesananItem, {foreignKey : 'bukuId', as:'pesananItems'})
      Buku.hasMany(models.ulasanBuku, {foreignKey : 'bukuId', as:'ulasanBukus'})
    }
  }
  Buku.init({
    penulisId: DataTypes.INTEGER,
    penerbitId: DataTypes.INTEGER,
    kategoriId: DataTypes.INTEGER,
    judul: DataTypes.STRING,
    harga: DataTypes.DECIMAL(10,2),
    isbn: DataTypes.CHAR(13),
    tahunTerbit: DataTypes.CHAR(4)
  }, {
    sequelize,
    modelName: 'Buku',
  });
  return Buku;
};