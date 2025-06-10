let { check, validationResult, body } = require('express-validator');
const db = require('../database/models');

module.exports = [
    check('email').isEmail().withMessage('Debes ingresar un email válido'),
    check('username').isLength({ min: 4 }).withMessage('El nombre de usuario debe tener al menos 4 caracteres'),
    check('direction').isLength({ min: 6 }).withMessage('La dirección debe tener al menos 6 caracteres'),
    check('zipcode').isLength({ min: 4, max: 4 }).withMessage('El código postal debe tener 4 caracteres'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    check('repassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),
    body('email').custom(value => {
        return db.User.findOne({ where: { email: value.toLowerCase() } })
            .then(user => {
                if (user) {
                    return Promise.reject('El email ya está registrado');
                }
            });
    })
]
