const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController.js')

router.get('/login', userController.login)
router.get('/register', userController.register)
router.get('/perfil', userController.perfil)
router.get('/editarperfil', userController.editarperfil)
router.get('/admin', userController.admin)
module.exports = router
