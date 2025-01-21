'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Discount extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Discount.belongsTo(models.Clothes, { foreignKey: "clothesId" })

        }
    }
    Discount.init({
        clothesId: DataTypes.INTEGER,
        value: DataTypes.STRING,
        startTime: DataTypes.STRING,
        endTime: DataTypes.STRING,
        note: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Discount',
    });

    return Discount;
};