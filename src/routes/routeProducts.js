const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');


router.get('/productos', productController.index);
router.get('/productos/detalle/:id', productController.detail);
router.get('/crear', productController.addProduct);
router.post('/crear', productController.addingProduct);
router.get('/productos/editar/:id', productController.editProduct);
router.put('/productos/editar/:id', productController.editingProduct);
router.delete('/productos/eliminar/:id', productController.deletingProduct);

module.exports = router;