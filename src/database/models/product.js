'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.Size, {
        through: models.ProductSizes,
        foreignKey: 'productId',
        otherKey: 'sizeId',
        as: 'sizes'
      }); 
      Product.belongsTo(models.Brand, {
        foreignKey: 'brandId',
        as : 'brand'
      });
      Product.belongsTo(models.Genre, {
        foreignKey: 'genreId',
        as : 'genre'
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    brandId: DataTypes.INTEGER,
    genreId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};