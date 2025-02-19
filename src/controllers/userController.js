let {leerProductos} = require("../data/products.js")
const path = require("path")
const ruta = path.resolve(__dirname, "../data/products.json")
let productos = leerProductos(ruta)

const userController = {
    login: (req, res) => {
        res.render('users/login.ejs')
    }, 
    register: (req, res) => {
        res.render('users/register.ejs')
    },
    perfil: (req, res) => {
        res.render('users/perfil.ejs')
    },
    editarperfil: (req, res) => {
        res.render('users/editarperfil.ejs')
    },
    admin: (req, res) => {
        res.render('users/admin.ejs', {productos: productos})
    },
    crearpubli: (req, res) => {
        res.render('users/crearpubli.ejs')
    }
}
module.exports = userController