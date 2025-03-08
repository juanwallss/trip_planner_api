'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Actividades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itinerarioId: {
        type: Sequelize.UUID
      },
      titulo: {
        type: Sequelize.STRING(50)
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      fecha: {
        type: Sequelize.DATE
      },
      hora: {
        type: Sequelize.TIME
      },
      latitud: {
        type: Sequelize.FLOAT
      },
      longitud: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Actividades');
  }
};