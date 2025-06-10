const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');

router.get('/login', userController.login);
router.get('/register', userController.register);
router.post('/register', registerValidator, userController.addingUser);
router.post('/login', loginValidator, userController.logging);
router.get('/logout', userController.logout);

router.get('/perfil', userController.profile);
router.get('/editarperfil', userController.editprofile);
router.put('/editarperfil/:id', userController.editingprofile);

router.get('/admin', userController.admin);

module.exports = router;