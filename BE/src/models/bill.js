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
            Bill.belongsTo(models.Clothes, { foreignKey: "clothesId" })
        }
    }
    Bill.init({
        time: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        clothesId: DataTypes.INTEGER,
        description: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Bill',
    });
    Bill.sync();
    return Bill;
};