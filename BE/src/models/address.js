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
            Address.belongsTo(models.User, { foreignKey: "userId" })
        }
    }
    Address.init({
        userId: DataTypes.INTEGER,
        provinceId: DataTypes.INTEGER,
        districtId: DataTypes.INTEGER,
        wardId: DataTypes.INTEGER,
        note: DataTypes.TEXT('long')
    }, {
        sequelize,
        modelName: 'Address',
    });
    return Address;
};