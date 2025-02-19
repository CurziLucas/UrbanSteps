const express = require('express')
const router = express.Router()

const productsController = require('../controllers/productsController.js')

router.get('/', productsController.index)
router.get('/detalle/:id', productsController.detail)
router.get('/agregarproducto', productsController.addProduct)
router.post('/agregarproducto', productsController.addingProduct)
router.get('/editarpubli/:id', productsController.editarPubli)

module.exports = router