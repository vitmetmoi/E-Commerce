'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Markdown.belongsTo(models.Clothes, { foreignKey: "clothesId", constraints: false })
        }
    }
    Markdown.init({
        clothesId: DataTypes.INTEGER,
        contentMarkdown: DataTypes.TEXT('LONG'),
    }, {
        sequelize,
        modelName: 'Markdown',
    });
    // Markdown.sync({ force: true });
    return Markdown;
};