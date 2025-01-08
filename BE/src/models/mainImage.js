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
            MainImage.belongsTo(models.Group, { foreignKey: "groupId" })
            MainImage.belongsTo(models.Color_Size, { foreignKey: "clothesId" })
        }
    }
    MainImage.init({
        clothesId: DataTypes.STRING,
        image: DataTypes.BLOB('long'),

    }, {
        sequelize,
        modelName: 'MainImage',
    });
    MainImage.sync();
    return MainImage;
};