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


    const itinerary1 = await queryInterface.sequelize.query(
      `SELECT id FROM itinerarios WHERE destino = 'maracaibo'
    `
    );
    const itinerary2 = await queryInterface.sequelize.query(
      `SELECT id FROM itinerarios WHERE destino = 'canada'
    `
    );
    const itineraryId1 = itinerary1[0][0].id;
    const itineraryId2 = itinerary2[0][0].id;

    await queryInterface.bulkInsert('actividades', [{
      itinerarioId: itineraryId1,
      titulo: 'Visita playa del carmen',
      descripcion: 'Levantarnos temprano para agarrar tour',
      fecha: new Date(),
      hora: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      itinerarioId: itineraryId1,
      titulo: 'Tour a Xcaret',
      descripcion: 'Pagar todo para que no nos dejen por fuera',
      fecha: new Date(),
      hora: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      itinerarioId: itineraryId2,
      titulo: 'Ir a esquiar',
      descripcion: 'Preparar llantas para ir a la montana',
      fecha: new Date(),
      hora: new Date(),
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
