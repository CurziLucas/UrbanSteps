'use strict';

const brandsArray = ['Nike', 'Adidas', 'Puma', 'New Balance', 'Under Armour', 'Reebok', 'Vans', 'Converse', 'Jordan'];
const brands = brandsArray.map((brand, index) => {
  return {
    name: brand,
    createdAt: new Date(),
    updatedAt: new Date()
  }
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Brands', brands, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Brands', null, {});

  }
};
