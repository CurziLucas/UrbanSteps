const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController.js')

router.get('/login', userController.login)
router.post('/login', userController.logging)
router.get('/logout', userController.logout)
router.get('/register', userController.register)
router.post('/register', userController.addingUser)
router.get('/perfil', userController.profile)
router.get('/editarperfil', userController.editprofile)
router.post('/editarperfil', userController.editingprofile)
router.get('/admin', userController.admin)

module.exports = router
