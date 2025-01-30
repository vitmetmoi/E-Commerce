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
            Color_Size.belongsTo(models.Clothes, { foreignKey: 'clothesId' });
        }
    }
    Color_Size.init({
        clothesId: DataTypes.INTEGER,
        color: DataTypes.INTEGER,
        size: DataTypes.INTEGER,
        stock: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Color_Size',
    });
    return Color_Size;
};