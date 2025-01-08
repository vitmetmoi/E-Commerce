'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RelevantImage extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            RelevantImage.belongsTo(models.Group, { foreignKey: "groupId" })
            RelevantImage.belongsTo(models.Color_Size, { foreignKey: "clothesId" })
        }
    }
    RelevantImage.init({
        clothesId: DataTypes.STRING,
        image: DataTypes.BLOB('long'),
    }, {
        sequelize,
        modelName: 'RelevantImage',
    });
    RelevantImage.sync();
    return RelevantImage;
};