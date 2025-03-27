'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Reviews', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            star: {
                allowNull: true,
                type: Sequelize.STRING
            },
            userId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            clothesId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            billId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            comment: {
                allowNull: true,
                type: Sequelize.TEXT('long')
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
        await queryInterface.dropTable('Reviews');
    }
};