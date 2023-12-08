'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pesananPayments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pesananId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'detailPesanans',
          key : 'id'
        }
      },
      provider: {
        type: Sequelize.STRING
      },
      statusBayar: {
        type: Sequelize.ENUM,
        values : ['Sudah Dibayar','Belum Dibayar']
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
    await queryInterface.dropTable('pesananPayments');
  }
};