'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Room extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Room.belongsTo(models.User, { foreignKey: "adminId", as: 'adminData', constraints: false });
            Room.belongsTo(models.User, { foreignKey: "customerId", as: 'customerData', constraints: false });
            Room.hasMany(models.Message, { foreignKey: 'roomId', constraints: false })
        }
    }
    Room.init({
        roomId: DataTypes.STRING,
        adminId: DataTypes.INTEGER,
        customerId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Room',
    });

    return Room;
};