'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detailUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references : {
          model : 'Users',
          key   : 'id'
        }
      },
      nama: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      kodePos: {
        type: Sequelize.CHAR(5)
      },
      telepon: {
        type: Sequelize.CHAR(12)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detailUsers');
  }
};