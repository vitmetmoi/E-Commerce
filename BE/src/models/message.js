'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Message extends Model {

        static associate(models) {
            Message.belongsTo(models.Room, { foreignKey: 'roomId' })
        }
    }
    Message.init({
        roomId: DataTypes.TEXT,
        message: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Message',
    });

    return Message;
};