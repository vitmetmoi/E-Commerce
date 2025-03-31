'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Message extends Model {

        static associate(models) {
            Message.belongsTo(models.Room, { foreignKey: 'roomId', constraints: false, constraints: false })
        }
    }
    Message.init({
        roomId: DataTypes.STRING,
        senderId: DataTypes.INTEGER,
        message: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Message',
    });

    return Message;
};