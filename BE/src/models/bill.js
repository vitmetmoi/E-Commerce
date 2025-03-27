'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Bill extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Bill.belongsTo(models.User, { foreignKey: "userId" })
            Bill.hasMany(models.ShoppingCart, { foreignKey: 'billId' })
            Bill.hasOne(models.Review, { foreignKey: 'billId' })
        }
    }
    Bill.init({
        status: DataTypes.STRING,
        time: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        amount: DataTypes.STRING,
        bankName: DataTypes.STRING,
        accountNumber: DataTypes.STRING,
        note: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Bill',
    });

    return Bill;
};