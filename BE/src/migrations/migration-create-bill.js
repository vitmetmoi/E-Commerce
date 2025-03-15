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

            status: {
                allowNull: true,
                type: Sequelize.STRING
            },

            time: {
                allowNull: true,
                type: Sequelize.STRING
            },
            userId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            amount: {
                allowNull: true,
                type: Sequelize.STRING
            },
            bankName: {
                allowNull: true,
                type: Sequelize.STRING
            },
            accountNumber: {
                allowNull: true,
                type: Sequelize.STRING
            },
            note: {
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