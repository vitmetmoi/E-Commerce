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
      User.belongsTo(models.Group, { foreignKey: "groupId", constraints: false })
      User.hasMany(models.Bill, { foreignKey: 'userId', constraints: false });
      User.hasMany(models.Address, { foreignKey: 'userId', constraints: false });
      User.hasMany(models.Review, { foreignKey: 'userId', constraints: false });
      User.hasMany(models.Room, { foreignKey: 'adminId', as: 'adminData', constraints: false })
      User.hasMany(models.Room, { foreignKey: 'customerId', as: 'customerData', constraints: false })
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