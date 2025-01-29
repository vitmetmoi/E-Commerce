'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Discounts', {
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
            value: {
                allowNull: true,
                type: Sequelize.STRING
            },
            note: {
                allowNull: true,
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Discounts');
    }
};