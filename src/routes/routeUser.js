const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/login', userController.login);
router.get('/register', userController.register);
router.post('/register', userController.addingUser);
router.post('/login', userController.logging);
router.get('/logout', userController.logout);

router.get('/perfil', userController.profile);
router.get('/editarperfil', userController.editprofile);
router.put('/editarperfil', userController.editingprofile);

router.get('/admin', userController.admin);

module.exports = router;