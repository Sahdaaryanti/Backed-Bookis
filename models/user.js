'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.detailUser, { foreignKey: 'userId', as: 'detailUsers' });
      User.hasMany(models.detailPesanan, { foreignKey: 'userId', as: 'detailPesanans' });
      User.hasMany(models.ulasanBuku, { foreignKey: 'userId', as: 'ulasanBukus' });
      User.hasMany(models.komentarUlasanBuku, { foreignKey: 'userId', as: 'komentarUlasanBukus' });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      levelUser: {
        type: DataTypes.ENUM('admin', 'member'),
        defaultValue: 'member',
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
