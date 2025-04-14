const { underscoredIf } = require("sequelize/lib/utils")

module.export = function(sequelize, dataTypes) {
    
    let alias = 'User'

    let cols = {
        id_usuario: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        username: {
            type: dataTypes.STRING,
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
        },
        direction: {
            type: dataTypes.STRING,
        },
        zipcode: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true,
            },
        },
        password: {
            type: dataTypes.STRING,
        }
    }
    
    let config = {
        tableName: 'Users',
        timestamps: false,
        underscored: true,
    }

    sequelize.define(alias, cols, config)
    return User
}
