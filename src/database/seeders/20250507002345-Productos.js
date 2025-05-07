'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const productsJSON = require('../../data/products.json');
    const brands = await queryInterface.sequelize.query(
      'SELECT id, name FROM Brands;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const genres = await queryInterface.sequelize.query(
      'SELECT id, name FROM Genres;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const products = productsJSON.map(product => {
      const brandFound = brands.find(brand => brand.name === product.brand);
      const genreFound = genres.find(genre => genre.name === product.genre);
      return {
        name: product.name,
        price: Math.floor(Math.random() * (200000 - 80000 + 1)) + 80000,
        description: product.description,
        image: product.img,
        brandId: brandFound ? brandFound.id : null,
        genreId: genreFound? genreFound.id : null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    await queryInterface.bulkInsert('Products', products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
