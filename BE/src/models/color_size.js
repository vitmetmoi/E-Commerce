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
            Color_Size.belongsTo(models.Clothes, { foreignKey: 'clothesId', constraints: false });
            Color_Size.hasMany(models.ShoppingCart, { foreignKey: 'colorSizeId', constraints: false });
        }
    }
    Color_Size.init({
        clothesId: DataTypes.INTEGER,
        color: DataTypes.STRING,
        size: DataTypes.STRING,
        stock: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Color_Size',
    });
    Color_Size.sync();
    return Color_Size;
};