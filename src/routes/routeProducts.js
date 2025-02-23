const express = require('express')
const router = express.Router()

const productsController = require('../controllers/productsController.js')
const { route } = require('./routeUser.js')

router.get('/', productsController.index)
router.get('/detalle/:id', productsController.detail)
router.get('/agregarproducto', productsController.addProduct)
router.post('/agregarproducto', productsController.addingProduct)
router.get('/editarpubli/:id', productsController.editProduct)
router.post('/editarpubli/:id', productsController.editingProduct)
router.post('/eliminarproducto/:id', productsController.deletingProduct)


module.exports = router



