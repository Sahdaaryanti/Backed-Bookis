'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('returPesanans', {
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
      deskripsi: {
        type: Sequelize.TEXT
      },
      statusRetur: {
        type: Sequelize.ENUM,
        values : ['Proses Review','Disetujui','Dikirim','Tidak Disetujui']
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
    await queryInterface.dropTable('returPesanans');
  }
};