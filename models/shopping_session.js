'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shopping_session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      shopping_session.belongsTo(models.User, {as : 'users', foreignKey : 'userId'})
      
      shopping_session.hasMany(models.cart, {foreignKey : 'sessionId', as:'carts'})
    }
  }
  shopping_session.init({
    userId: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'shopping_session',
  });
  return shopping_session;
};
