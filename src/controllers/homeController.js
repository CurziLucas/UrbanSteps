//let {leerProductos} = require("../data/products.js")
//const path = require("path")
//const ruta = path.resolve(__dirname, "../data/products.json")
//let productos = leerProductos(ruta)

const mongoose = require('mongoose');
const db = mongoose.connection;

const obtenerProductos = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM products';
        db.query(sql, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

const obtenerProductosPorGenero = (genero) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM products WHERE genre = ?';
        db.query(sql, [genero], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

const homeController = {
    index: async (req, res) => {
        try {
            const productos = await obtenerProductos();
            res.render('home.ejs', {
                titulo: 'UrbanSteps',
                productos: productos
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: 'Error al obtener productos' });
        }
    },
    about: (req, res) => {
        res.render('acerca-de.ejs');
    },
    preguntas: (req, res) => {
        res.render('preguntas-f.ejs');
    },
    talles: (req, res) => {
        res.render('guia-talles.ejs');
    },
    termino: (req, res) => {
        res.render('tyc.ejs');
    },
    publicacion: (req, res) => {
        res.render('publicacion.ejs');
    },
    genreM: async (req, res) => {
        try {
            const productos = await obtenerProductosPorGenero('M');
            res.render('genreM.ejs', {
                titulo: 'UrbanSteps',
                productos: productos
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: 'Error al obtener productos masculinos' });
        }
    },
    genreF: async (req, res) => {
        try {
            const productos = await obtenerProductosPorGenero('F');
            res.render('genreF.ejs', {
                titulo: 'UrbanSteps',
                productos: productos
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: 'Error al obtener productos femeninos' });
        }
    }
};

module.exports = homeController;