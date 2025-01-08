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
            Markdown.belongsTo(models.Group, { foreignKey: "groupId" })
            Markdown.belongsTo(models.Color_Size, { foreignKey: "clothesId" })
        }
    }
    Markdown.init({
        clothesId: DataTypes.STRING,
        contentHTML: DataTypes.TEXT('long'),
        contentMarkdown: DataTypes.TEXT('LONG'),
    }, {
        sequelize,
        modelName: 'Markdown',
    });
    Markdown.sync();
    return Markdown;
};