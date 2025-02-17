const express = require('express')
const router = express.Router()

const productsController = require('../controllers/productsController.js')

router.get('/', productsController.index)
router.get('/:id', productsController.detail)
// router.get('/preguntas-f', productsController.preguntas)
// router.get('/guia-talles',productsController.talles)
// router.get('/tyc', productsController.termino)
// router.get('/publicacion', productsController.publicacion)

module.exports = router