'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Color_Sizes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            clothesId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            colorId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            sizeId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            amount: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),

            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Color_Sizes');
    }
};