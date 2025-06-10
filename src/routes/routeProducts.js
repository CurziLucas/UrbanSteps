const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');


router.get('/productos', productController.index);
router.get('/detalle/:id', productController.detail);
router.get('/agregarproducto', productController.addProduct);
router.post('/agregarproducto', productController.addingProduct);
router.get('/editarpubli/:id', productController.editProduct);
router.put('/editarpubli/:id', productController.editingProduct);
router.delete('/eliminarproducto/:id', productController.deletingProduct);

module.exports = router;