const {error} = require("console")

//let {leerProductos, buscarProducto, agregarProducto, eliminarProducto, editarProducto} = require("../data/products.js")
//const path = require("path")
//const ruta = path.resolve(__dirname, "../data/products.json")
//let productos = leerProductos(ruta)


const productsController = {
    index: async (req, res) => {
        try {
            console.log('Intentando conectar a la base de datos...');
            const productos = await Product.findAll({
                attributes: ['id', 'name', 'description', 'price', 'brand', 'model', 'genre', 'img']
            });
            console.log('Productos obtenidos:', productos);
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
        Product.findAll()
            .then(productos => {
                res.render('home.ejs', {
                    titulo: 'UrbanSteps',
                    productos: productos
                });
            })
            .catch(error => {
                console.error("Error al obtener productos:", error);
                res.status(500).send("Error al cargar productos");
            });
    },
    detail: (req, res) => {
        const id = req.params.id;
    
    connection.query('SELECT * FROM productos WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener los datos:', err);
            return res.status(500).send('Error en el servidor');
        }
        
        res.render('publicacion.ejs', {
            producto: results[0]
        });
    });
    },
    addProduct: (req, res) => {
        res.render('users/crearpubli.ejs', {})
    },
    addingProduct: (req, res) => {
        const nuevoProducto = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            brand: req.body.brand,
            model: req.body.model,
            genre: req.body.genre
        }
    
        const sql = 'INSERT INTO products SET ?';
        
        db.query(sql, nuevoProducto, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send({ message: 'Error al guardar el producto' });
            } else {
                res.redirect('/products');
            }
        });
    },
    editProduct: (req, res) => {
        const sql = 'SELECT * FROM products WHERE id = ?';
        
        db.query(sql, [req.params.id], (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send({ message: 'Error al obtener el producto' });
            } else if (results.length === 0) {
                res.status(404).send({ message: 'Producto no encontrado' });
            } else {
                res.render('products/editarpubli.ejs', {
                    producto: results[0]
                });
            }
        });
    },
    editingProduct: (req, res) => {
        const sql = 'SELECT * FROM products WHERE id = ?';
        
        db.query(sql, [req.params.id], (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send({ message: 'Error al obtener el producto' });
                return;
            }
            
            if (results.length === 0) {
                res.status(404).send({ message: 'Producto no encontrado' });
                return;
            }
    
            const producto = results[0];
            const productoEditado = {
                id: producto.id,
                name: req.body.nombre || producto.name,
                description: req.body.descripcion || producto.description,
                price: req.body.precio || producto.price,
                brand: req.body.marca || producto.brand,
                model: req.body.modelo || producto.model,
                sizes: producto.sizes,
                colors: producto.colors,
                genre: req.body.genero || producto.genre,
                img: producto.img
            };
    
            const sqlUpdate = 'UPDATE products SET ? WHERE id = ?';
            
            db.query(sqlUpdate, [productoEditado, producto.id], (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).send({ message: 'Error al actualizar el producto' });
                } else {
                    res.redirect('/products/detalle/' + producto.id);
                }
            });
        });
    },
    deletingProduct: (req, res) => {
        const sql = 'DELETE FROM products WHERE id = ?';
        
        db.query(sql, [req.params.id], (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send({ message: 'Error al eliminar el producto' });
            } else if (results.affectedRows === 0) {
                res.status(404).send({ message: 'Producto no encontrado' });
            } else {
                res.redirect('/user/admin');
            }
        });
    },
    
};
    
    // preguntas: (req, res) => {
    //     res.render('preguntas-f.ejs')
    // },
    // talles: (rep, res) => {
    //     res.render('guia-talles.ejs')
    // },
    // termino: (rep, res) =>{
    //     res.render('tyc.ejs')
    // },
    // publicacion: (req, res) => {
    //     res.render('publicacion.ejs')
    // }

module.exports = productsController