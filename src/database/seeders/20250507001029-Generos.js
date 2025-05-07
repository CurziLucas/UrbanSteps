'use strict';

const genresArray = ['Masculino', 'Femenino', 'Unisex'];
const genres = genresArray.map((genre, index) => {
  return {
    name: genre,
    createdAt: new Date(),
    updatedAt: new Date()
  }
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Genres', genres, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Genres', null, {});

  }
};
