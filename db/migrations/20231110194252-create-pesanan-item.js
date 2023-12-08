'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pesananItems', {
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
      bukuId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Bukus',
          key : 'id'
        }
      },
      jumlah: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('pesananItems');
  }
};