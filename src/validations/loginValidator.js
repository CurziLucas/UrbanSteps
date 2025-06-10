let { check, validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../database/models');


module.exports = [ 
    check('email').isEmail().withMessage('Debes ingresar un email válido'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('email').custom(function(value){
        return db.User.findOne({where: {email: value.toLowerCase()}})
            .then(user => {
                if (!user) {
                    return Promise.reject('El email no está registrado')
                }
            })  
    }),
    body('password').custom(function(value, {req}){
        return db.User.findOne({where: {email: req.body.email.toLowerCase()}})
            .then(user => {
                if (user) {
                    let contraseña = bcrypt.compareSync(value, user.password)
                    if (!contraseña) {
                        return Promise.reject('Contraseña incorrecta')
                    }
                }
            })
    })
];