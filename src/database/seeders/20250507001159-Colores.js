'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const colors = [
      {
        name: 'Blanco',
        hexa: '#FFFFFF',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Rojo',
        hexa: '#FF0000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Azul',
        hexa: '#0000FF',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Marron',
        hexa: '#8B4513',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Negro',
        hexa: '#000000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Verde',
        hexa: '#008000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bordo',
        hexa: '#800000',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Colors', colors, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Colors', null, {});
  }
};