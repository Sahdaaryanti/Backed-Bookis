'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Users',
          key : 'id'
        }
      },
      bukuid: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Bukus',
          key : 'id'
        }
      },
      jumlah: {
        type: Sequelize.INTEGER
      },
      createdAt: { // Change here
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: { // Change here
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('carts');
  }
};
