const {error} = require("console")
let {leerProductos, buscarProducto, agregarProducto, eliminarProducto, editarProducto} = require("../data/products.js")
const path = require("path")
const ruta = path.resolve(__dirname, "../data/products.json")
let productos = leerProductos(ruta)


const productsController = {
    index: (req, res) => {
        res.render('home.ejs', {
            titulo: 'UrbanSteps',
            productos:productos
        })
    },
    detail: (req, res) => {
        res.render('publicacion.ejs', {
            producto:buscarProducto(req.params.id, productos)
        })
    },
    addProduct: (req, res) =>{
        res.render('users/crearpubli.ejs', {})
    },
    addingProduct: (req, res) =>{
        let nuevoProducto = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            brand: req.body.brand,
            model: req.body.model,
            genre: req.body.genre
        }
        agregarProducto(ruta, nuevoProducto)
            .then(() => {
                res.redirect('/products')
            })
            .catch(error => {
                console.log(error)
            })
    },
    editProduct: (req,res) => {
        let producto = buscarProducto(req.params.id, productos)
        res.render('products/editarpubli.ejs',{
            producto: producto
        } )
    },
    editingProduct: (req, res) => {
        let producto = buscarProducto(req.params.id, productos)
        let productoEditado = {
            id: producto.id,
            name: producto.name == req.body.nombre ? producto.name : req.body.nombre,
            description: producto.description == req.body.descripcion ? producto.description : req.body.descripcion,
            price: producto.price == req.body.precio ? producto.price : req.body.precio,
            brand: producto.brand == req.body.marca ? producto.brand : req.body.marca,
            model: producto.model == req.body.modelo ? producto.model : req.body.modelo,
            sizes: producto.sizes,
            colors: producto.colors,
            genre: producto.genre == req.body.genero ? producto.genre : req.body.genero,
            img: producto.img
        }
        // console.log(productoEditado)
        editarProducto(ruta, producto.id, productoEditado)
            .then(() => {
                res.redirect('/products/detalle/' + producto.id)
            })
            .catch(error => {
                console.log(error)
            })
    },
    deletingProduct: (req, res) => {
        eliminarProducto(ruta, req.params.id)
            .then(() => {
                res.redirect('/user/admin')
            })
            .catch(error => {
                console.log(error)
            })
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