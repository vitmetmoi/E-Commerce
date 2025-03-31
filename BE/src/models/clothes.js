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
            // Clothes.belongsTo(models.Color_Size, { foreignKey: "clothesId" })
            Clothes.hasMany(models.Color_Size, { foreignKey: 'clothesId', constraints: false });
            Clothes.hasMany(models.Discount, { foreignKey: 'clothesId', constraints: false });
            Clothes.hasMany(models.RelevantImage, { foreignKey: 'clothesId', constraints: false });
            Clothes.hasMany(models.Markdown, { foreignKey: 'clothesId', constraints: false });
            Clothes.hasMany(models.Review, { foreignKey: 'clothesId', constraints: false });
        }
    }
    Clothes.init({
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        category: DataTypes.STRING,
        price: DataTypes.FLOAT,
    }, {
        sequelize,
        modelName: 'Clothes',
    });
    // Clothes.sync({ alter: true, force: true })
    return Clothes;
};