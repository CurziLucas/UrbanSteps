'use strict';

const sizesArray = [35, 36, 37, 38, 40, 42];
const sizes = sizesArray.map(size => {
  return {
    value: size,
    createdAt: new Date(),
    updatedAt: new Date()
  }
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Sizes', sizes, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sizes', null, {});
  }
};
