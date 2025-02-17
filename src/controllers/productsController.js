let {leerProductos, buscarProducto} = require("../data/products.js")
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