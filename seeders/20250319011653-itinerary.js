'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const user = await queryInterface.sequelize.query(
      `SELECT id FROM usuarios WHERE email = 'juan@example.com'
    `
    );
    const user2 = await queryInterface.sequelize.query(
      `SELECT id FROM usuarios WHERE email = 'felix@example.com'
    `
    );
    const userId = user[0][0].id;
    const userId2 = user2[0][0].id;

    await queryInterface.bulkInsert('itinerarios', [{
      usuarioId: userId,
      titulo: 'Viaje a Maracaibo',
      descripcion: 'Viaje familiar con todos',
      destino: 'Maracaibo',
      fechaInicio: new Date(),
      fechaFin: new Date(),
      latitud: 10.641,
      longitud: -71.6074,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      usuarioId: userId,
      titulo: 'Viaje a nieve',
      descripcion: 'Viaje familiar con todos',
      destino: 'canada',
      fechaInicio: new Date(),
      fechaFin: new Date(),
      latitud: 10.641,
      longitud: -71.6074,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      usuarioId: userId2,
      titulo: 'Viaje a Roma',
      descripcion: 'Viaje familiar con todos',
      destino: 'ROMA',
      fechaInicio: new Date(),
      fechaFin: new Date(),
      latitud: 10.641,
      longitud: -71.6074,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('itinerarios', null, {});
  }
};
