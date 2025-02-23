let {leerProductos} = require("../data/products.js")
const path = require("path")
const ruta = path.resolve(__dirname, "../data/products.json")
let productos = leerProductos(ruta)

const homeController = {
    index: (req, res) => {
        res.render('home.ejs', {
            titulo: 'UrbanSteps',
            productos:productos
        })
    },
    about: (req, res) => {
        res.render('acerca-de.ejs')
    },
    preguntas: (req, res) => {
        res.render('preguntas-f.ejs')
    },
    talles: (rep, res) => {
        res.render('guia-talles.ejs')
    },
    termino: (rep, res) =>{
        res.render('tyc.ejs')
    },
    publicacion: (req, res) => {
        res.render('publicacion.ejs')
    },
    genreM: (req, res) => {
        res.render('genreM.ejs', {
            titulo: 'UrbanSteps',
            productos:productos
        })
    },
    genreF: (req, res) => {
        res.render('genreF.ejs', {
            titulo: 'UrbanSteps',
            productos:productos
        })
    }
}
module.exports = homeController