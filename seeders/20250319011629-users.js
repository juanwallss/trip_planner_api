'use strict';
const bcrypt = require('bcryptjs');

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

    const password = await bcrypt.hash('123456', 10);
    await queryInterface.bulkInsert('usuarios', [{
      nombre: 'John Doe',
      email: 'juan@example.com',
      contraseña: password,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      nombre: 'Felix El Gato',
      email: 'felix@example.com',
      contraseña: password,
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

    await queryInterface.bulkDelete('usuarios', null, {});

  }
};
