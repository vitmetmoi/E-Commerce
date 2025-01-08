'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Color_Size extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Color_Size.hasMany(models.Clothes, { foreignKey: 'clothesId' });
        }
    }
    Color_Size.init({
        clothesId: DataTypes.INTEGER,
        colorId: DataTypes.INTEGER,
        sizeId: DataTypes.INTEGER,
        amount: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Color_Size',
    });
    Color_Size.sync();
    return Color_Size;
};