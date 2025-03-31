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
            Review.belongsTo(models.User, { foreignKey: "userId", constraints: false })
            Review.belongsTo(models.Clothes, { foreignKey: "clothesId", constraints: false })
            Review.hasMany(models.ReviewImage, { foreignKey: 'reviewId', constraints: false });
            Review.belongsTo(models.Bill, { foreignKey: 'billId', constraints: false })
        }
    }
    Review.init({
        star: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        clothesId: DataTypes.INTEGER,
        billId: DataTypes.INTEGER,
        comment: DataTypes.TEXT('long'),
    }, {
        sequelize,
        modelName: 'Review',
    });

    return Review;
};