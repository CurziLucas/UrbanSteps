const {error} = require("console")
let {leerProductos, buscarProducto, agregarProducto} = require("../data/products.js")
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
        // res.render('users/crearpubli.ejs', {})
        console.log(req.body)
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
    editarPubli: (req,res) => {
        res.render('editarpubli.ejs')
    }
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
}
module.exports = productsController