let {leerProductos} = require("../data/products.js")
const path = require("path")
const ruta = path.resolve(__dirname, "../data/products.json")
let productos = leerProductos(ruta)
const { agregarUsuario, leerUsuarios, buscarUsuario, editarUsuario } = require("../data/users.js")
const rutaUsuario = path.resolve(__dirname, "../data/users.json")
let usuarios = leerUsuarios(rutaUsuario)

const userController = {
    login: (req, res) => {
        res.render('users/login.ejs')
    }, 
    register: (req, res) => {
        res.render('users/register.ejs')
    },
    profile: (req, res) => {
        res.render('users/perfil.ejs')
    },
    editprofile: (req, res) => {
        res.render('users/editarperfil.ejs')
    },
    editingprofile: (req, res) => {
        let usuario = buscarUsuario(req.parms.id, usuarios)
        let usuarioEditado = {
            id: req.locals.user,
            username: usuario.username == req.locals.username ? producto.name : req.body.nombre,
            email: usuario.email == req.locals.email ? producto.email : req.body.email,
            direction: usuario.direction == req.locals.direction ? producto.direction : req.body.direction,
            zipcode: usuario.zipcode == req.locals.zipcode ? producto.zipcode : req.body.zipcode,
            password: usuario.password == req.locals.password ? producto.password : req.body.password,
            avatar: usuario.avatar == req.locals.avatar ? producto.avatar : req.body.avatar
        }
        editarUsuario(ruta, usuario.id, usuarioEditado)
            .then(() => {
                res.redirect('/products/detalle/' + usuario.id)
            })
            .catch(error => {
                console.log(error)
            })
    },
    admin: (req, res) => {
        res.render('users/admin.ejs', {productos: productos})
    },
    addingUser: (req, res) =>{
        let nuevoUsuario = {
            username: req.body.username,
            email: req.body.email.toLowerCase(),
            direction: req.body.direction,
            zipcode: req.body.zipcode,
            password: req.body.password
        }
        agregarUsuario(rutaUsuario, nuevoUsuario)
            .then(() => {
                res.redirect('/')
            })
            .catch(error => {
                console.log(error)
            })
    },
    logging: (req, res) => {
        let usuario = buscarUsuario(req.body.email, usuarios)
        if (usuario != undefined) {
            if (req.body.password == usuario.password){
                req.session.user = {
                    id: usuario.id,
                    username: usuario.username,
                    email: usuario.email,
                    direction: usuario.direction,
                    zipcode: usuario.zipcode,
                    password: usuario.password,
                    avatar: usuario.avatar
                }
                res.locals.user = req.session.user
                res.redirect('/')
            } else res.redirect('/')
        }else res.redirect('/')
    },
    logout: (req, res) => {
        req.session.destroy()
        res.redirect('/')
    }
}
module.exports = userController