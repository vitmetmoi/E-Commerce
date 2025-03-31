'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ShoppingCart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            ShoppingCart.belongsTo(models.Bill, { foreignKey: "billId", constraints: false })
            ShoppingCart.belongsTo(models.Color_Size, { foreignKey: 'colorSizeId', constraints: false })
        }
    }
    ShoppingCart.init({
        billId: DataTypes.INTEGER,
        colorSizeId: DataTypes.INTEGER,
        total: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'ShoppingCart',
    });
    ShoppingCart.sync({ alter: true })
    return ShoppingCart;
};