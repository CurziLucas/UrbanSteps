const { underscoredIf } = require("sequelize/lib/utils")

module.export = function(sequelize, dataTypes) {
    
    let alias = 'productdesc'

    let cols = {
        id_produc: {
            autoIncrement: true,
            type: dataTypes.INTEGER,
        },
        id_produc_cont: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        price: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true,
            },
        },
        brand: {
            type: dataTypes.STRING,
        },
        model: {
            type: dataTypes.STRING,
        },
        size: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true,
            },
        },
        color: {
            type:dataTypes.STRING,
        },
        genre: {
            type:dataTypes.STRING,
        }
    }
    
    let config = {
        tableName: 'Productdesc',
        timestamps: false,
        underscored: true,
    }

    sequelize.define(alias, cols, config)
    return productdesc
}
