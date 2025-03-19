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
    const userId = user[0][0].id;

    await queryInterface.bulkInsert('itinerarios', [{
      usuarioId: userId,
      nombre: 'Viaje a la playa',
      descripcion: 'Viaje familiar con todos',
      destino: 'cancun',
      fechaInicio: new Date(),
      fechaFin: new Date(),
      latitud: 12312.123,
      longitud: 12312.123,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      usuarioId: userId,
      nombre: 'Viaje a nieve',
      descripcion: 'Viaje familiar con todos',
      destino: 'canada',
      fechaInicio: new Date(),
      fechaFin: new Date(),
      latitud: 12312.123,
      longitud: 12312.123,
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
