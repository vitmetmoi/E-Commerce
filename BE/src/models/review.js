'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Review.belongsTo(models.Group, { foreignKey: "groupId" })
            Review.belongsTo(models.Color_Size, { foreignKey: "clothesId" })
        }
    }
    Review.init({
        star: DataTypes.STRING,
        userId: DataTypes.STRING,
        clothesId: DataTypes.STRING,
        comment: DataTypes.TEXT('long'),
    }, {
        sequelize,
        modelName: 'Review',
    });
    Review.sync();
    return Review;
};