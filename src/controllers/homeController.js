//let {leerProductos} = require("../data/products.js")
//const path = require("path")
//const ruta = path.resolve(__dirname, "../data/products.json")
//let productos = leerProductos(ruta)

const db = require('../database/models');

const obtenerProductos = async () => {
    try {
        // Utiliza el modelo Product de Sequelize
        const productos = await db.Product.findAll();
        return productos;
    } catch (error) {
        throw error;
    }
};

const obtenerProductosPorGenero = async (genero) => {
    try {
        const productos = await db.Product.findAll({
            where: { genreId: genero }
        });
        return productos;
    } catch (error) {
        throw error;
    }
};

const homeController = {
    index: async (req, res) => {
        try {
            const products = await db.Product.findAll({
                include: [{ association: 'brand' }, { association: 'genre' }]
            });
            res.render('home.ejs', {
                titulo: 'UrbanSteps',
                productos: products
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
            const productos = await obtenerProductosPorGenero([1, 3]);
            console.log(productos);
            res.render('genreM.ejs', { productos });
        } catch (error) {
            console.error('Error al obtener productos por género:', error);
            res.status(500).send('Error en el servidor');
        }
    },
    genreF: async (req, res) => {
        try {
            const productos = await obtenerProductosPorGenero([2, 3]);
            console.log(productos);
            res.render('genreF.ejs', { productos });
        } catch (error) {
            console.error('Error al obtener productos por género:', error);
            res.status(500).send('Error en el servidor');
        }
    }
};

module.exports = homeController;