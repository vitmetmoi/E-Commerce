'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Address extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Address.belongsTo(models.User, { foreignKey: "userId", constraints: false })
        }
    }
    Address.init({
        userId: DataTypes.INTEGER,
        provinceId: DataTypes.STRING,
        districtId: DataTypes.STRING,
        wardId: DataTypes.STRING,
        note: DataTypes.TEXT('long')
    }, {
        sequelize,
        modelName: 'Address',
    });
    Address.sync({ alter: true })
    return Address;
};