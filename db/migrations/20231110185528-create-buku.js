'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bukus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      penulisId: {
        type: Sequelize.INTEGER,
        references: {
          model : 'Penulis',
          key : 'id'
        }
      },
      penerbitId: {
        type: Sequelize.INTEGER,
        references: {
          model : 'Penerbits',
          key : 'id'
        }
      },
      kategoriId: {
        type: Sequelize.INTEGER,
        references: {
          model : 'Kategoris',
          key : 'id'
        }
      },
      judul: {
        type: Sequelize.INTEGER
      },
      harga: {
        type: Sequelize.DECIMAL(10,2)
      },
      isbn: {
        type: Sequelize.CHAR(13)
      },
      tahunTerbit: {
        type: Sequelize.CHAR(4)
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
    await queryInterface.dropTable('Bukus');
  }
};