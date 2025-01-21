'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Clothes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Clothes.belongsTo(models.Color_Size, { foreignKey: "clothesId" })
            Clothes.hasMany(models.Color_Size, { foreignKey: 'clothesId' });
            Clothes.hasMany(models.Discount, { foreignKey: 'clothesId' });
            Clothes.hasMany(models.MainImage, { foreignKey: 'clothesId' });
            Clothes.hasMany(models.RelevantImage, { foreignKey: 'clothesId' });
            Clothes.hasMany(models.Markdown, { foreignKey: 'clothesId' });
            Clothes.hasMany(models.Bill, { foreignKey: 'clothesId' });
            Clothes.hasMany(models.Review, { foreignKey: 'clothesId' });
        }
    }
    Clothes.init({
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        price: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Clothes',
    });

    return Clothes;
};