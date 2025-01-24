const express = require('express')
const router = express.Router()

const homeController = require('../controllers/homeController.js')

router.get('/', homeController.index)
router.get('/acerca-de', homeController.about)
router.get('/preguntas-f', homeController.preguntas)
router.get('/guia-talles',homeController.talles)
router.get('/tyc', homeController.termino)
module.exports = router