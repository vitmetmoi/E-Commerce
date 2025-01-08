'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MainImage extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            MainImage.belongsTo(models.Clothes, { foreignKey: "clothesId" })
        }
    }
    MainImage.init({
        clothesId: DataTypes.INTEGER,
        image: DataTypes.BLOB('long'),

    }, {
        sequelize,
        modelName: 'MainImage',
    });
    MainImage.sync();
    return MainImage;
};