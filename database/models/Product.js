const { underscoredIf } = require("sequelize/lib/utils")

module.export = function(sequelize, dataTypes) {
    
    let alias = 'product'

    let cols = {
        id_product: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        name: {
            type: dataTypes.STRING,
        },
        description: {
            type: dataTypes.STRING,
        }
    }
    
    let config = {
        tableName: 'Products',
        timestamps: false,
        underscored: true,
    }

    const product = sequelize.define(alias, cols, config)
    return product
}
