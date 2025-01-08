'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Bills', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            time: {
                allowNull: true,
                type: Sequelize.STRING
            },
            BillId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            clothesId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            description: {
                allowNull: true,
                type: Sequelize.TEXT
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
        await queryInterface.dropTable('Bills');
    }
};