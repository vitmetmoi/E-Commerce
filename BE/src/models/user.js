'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Group, { foreignKey: "groupId" })
      User.hasMany(models.Bill, { foreignKey: 'userId' });
      User.hasMany(models.Address, { foreignKey: 'userId' });
      User.hasMany(models.Review, { foreignKey: 'userId' });
      User.hasMany(models.Room)
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    birthDay: DataTypes.STRING,
    gender: DataTypes.STRING,
    avatar: DataTypes.BLOB('long'),
    groupId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};