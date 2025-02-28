'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Addresss', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            userId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            provinceId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            districtId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            wardId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            wardId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            note: {
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
        await queryInterface.dropTable('Addresss');
    }
};