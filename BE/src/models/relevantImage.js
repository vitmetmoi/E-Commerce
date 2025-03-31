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
            RelevantImage.belongsTo(models.Clothes, { foreignKey: "clothesId", constraints: false })
        }
    }
    RelevantImage.init({
        clothesId: DataTypes.INTEGER,
        image: DataTypes.BLOB('long'),
    }, {
        sequelize,
        modelName: 'RelevantImage',
    });
    // RelevantImage.sync({ force: true })
    return RelevantImage;
};