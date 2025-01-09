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
            Review.belongsTo(models.User, { foreignKey: "userId" })
            Review.belongsTo(models.Clothes, { foreignKey: "clothesId" })
            Review.hasMany(models.ReviewImage, { foreignKey: 'reviewId' });
        }
    }
    Review.init({
        star: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        clothesId: DataTypes.INTEGER,
        comment: DataTypes.TEXT('long'),
    }, {
        sequelize,
        modelName: 'Review',
    });
    Review.sync();
    return Review;
};