const db = require('../database/models');
const Product = db.Product;

const productsController = {
    index: async (req, res) => {
    try {
        console.log('Intentando conectar a la base de datos...');
        const productos = await Product.findAll({
            attributes: ['id', 'name', 'description', 'price', 'img'],
            include: [{
                model: models.Brand,
                as: 'brand'
            }, {
                model: models.Genre,
                as: 'genre'
            }]
        });
        res.render('home.ejs', {
            titulo: 'UrbanSteps',
            productos: productos
        });
    } catch (error) {
        console.error('Error completo:', error);
        console.error('Mensaje de error:', error.message);
        console.error('Stack trace:', error.stack);
        res.status(500).json({
            error: "Error al obtener productos",
            detalles: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
},

    detail: async (req, res) => {
        const id = req.params.id;
        if (isNaN(id)) {
            return res.status(400).send('ID inválido');
        }
        try {
            const producto = await Product.findByPk(id,{
                include: [{
                    model: db.Size,
                    as: 'sizes'
                }]
            });
            console.log(producto.sizes)
            if (!producto) {
                return res.status(404).send('Producto no encontrado');
            }
            res.render('publicacion.ejs', {
                producto: producto
            });
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            return res.status(500).send('Error en el servidor');
        }
    },

    addProduct: (req, res) => {
        res.render('users/crearpubli.ejs', {})
    },

    addingProduct: async (req, res) => {
        try {
            const nuevoProducto = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                brandId: req.body.brandId,
                model: req.body.model,
                genreId: req.body.genreId
            };
            const producto = await Product.create(nuevoProducto);
            res.redirect('/products/detalle/' + producto.id);
        } catch (error) {
            console.error('Error al guardar el producto:', error);
            res.status(500).send({ message: 'Error al guardar el producto' });
        }
    },

    editProduct: async (req, res) => {
        try {
            const producto = await Product.findByPk(req.params.id);
            if (!producto) {
                return res.status(404).send({ message: 'Producto no encontrado' });
            }
            res.render('products/editarpubli.ejs', {
                producto: producto
            });
        } catch (error) {
            console.error('Error al obtener el producto:', error);
            res.status(500).send({ message: 'Error al obtener el producto' });
        }
    },

    editingProduct: async (req, res) => {
        try {
            const producto = await Product.findByPk(req.params.id);
            if (!producto) {
                return res.status(404).send({ message: 'Producto no encontrado' });
            }
            const productoEditado = {
                id: producto.id,
                name: req.body.nombre || producto.name,
                description: req.body.descripcion || producto.description,
                price: req.body.precio || producto.price,
                brand: req.body.marca || producto.brand,
                model: req.body.modelo || producto.model,
                genre: req.body.genero || producto.genre
            };
            await Product.update(productoEditado, {
                where: { id: producto.id }
            });
            res.redirect('/products/detalle/' + producto.id);
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            res.status(500).send({ message: 'Error al actualizar el producto' });
        }
    },

    deletingProduct: async (req, res) => {
        try {
            const resultado = await Product.destroy({
                where: { id: req.params.id }
            });
            if (resultado === 0) {
                return res.status(404).send({ message: 'Producto no encontrado' });
            }
            res.redirect('/user/admin');
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            res.status(500).send({ message: 'Error al eliminar el producto' });
        }
    }
};

module.exports = productsController;