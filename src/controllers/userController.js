//let {leerProductos} = require("../data/products.js")
//const path = require("path")
//const ruta = path.resolve(__dirname, "../data/products.json")
//let productos = leerProductos(ruta)
//const { agregarUsuario, leerUsuarios, buscarUsuario, editarUsuario } = require("../data/users.js")
//const rutaUsuario = path.resolve(__dirname, "../data/users.json")
//let usuarios = leerUsuarios(rutaUsuario)
const { check, validationResult, body } = require('express-validator');
const db = require('../database/models');
const User = db.User;
const bcrypt = require('bcrypt');


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
        const user = req.session.user;
        if (!user) {
            return res.redirect('/user/login');
        }
        res.render('users/editarperfil.ejs', { user });
    },
editingprofile: async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).send({ message: 'Usuario no encontrado' });

    const datosActualizados = {
      userName: req.body.username || user.userName,
      email: req.body.email || user.email,
      address: req.body.direction || user.address,
      zipCode: req.body.zipcode || user.zipCode,
      avatar: req.body.avatar || user.avatar
    };

    // Si se cambió el password, lo hasheamos
    if (req.body.password) {
      datosActualizados.password = bcrypt.hashSync(req.body.newpassword, 10);
    }

    await user.update(datosActualizados);
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error al actualizar el usuario' });
  }
},
    admin: async (req, res) => {
        try {
            const productos = await db.Product.findAll();
            res.render('users/admin.ejs', { productos });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: 'Error al obtener productos' });
        }
    },


    addingUser: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const nuevoUsuario = {
                userName: req.body.username,
                email: req.body.email.toLowerCase(),
                address: req.body.direction,
                zipCode: req.body.zipcode,
                password: hashedPassword,
                roleId: 2
            }
            db.User.create(nuevoUsuario)
                .then(() => {
                    res.redirect('/')
                })
                .catch(error => {
                    console.log(error)
                })
            
        }else {
            return res.render('users/register.ejs', { errors: errors.errors });
        }
        // try {
        //     const hashedPassword = await bcrypt.hash(req.body.password, 10);
        //     const nuevoUsuario = {
        //         userName: req.body.username,
        //         email: req.body.email.toLowerCase(),
        //         address: req.body.direction,
        //         zipCode: req.body.zipcode,
        //         password: hashedPassword,
        //         roleId: 2
        //     };

        //     await db.User.create(nuevoUsuario);
        //     res.redirect('/');
        // } catch (error) {
        //     console.log(error);
        //     res.status(500).send({ message: 'Error al crear el usuario' });
        // }
    },
    // addingUser: (req, res) => {
    //     const nuevoUsuario = {
    //         username: req.body.username,
    //         email: req.body.email.toLowerCase(),
    //         direction: req.body.direction,
    //         zipcode: req.body.zipcode,
    //         password: req.body.password
    //     };

    //     const sql = 'INSERT INTO users SET ?';
    //     db.query(sql, nuevoUsuario, (error, results) => {
    //         if (error) {
    //             console.log(error);
    //             res.status(500).send({ message: 'Error al crear el usuario' });
    //         } else {
    //             res.redirect('/');
    //         }
    //     });
    // },
    logging: async (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()){
            db.User.findOne({ where: { email: req.body.email.toLowerCase() } })
                .then(usuario =>{
                    if (bcrypt.compareSync(req.body.password, usuario.password)) {
                        req.session.user = {
                            id: usuario.id,
                            username: usuario.userName,
                            email: usuario.email,
                            direction: usuario.address,
                            zipcode: usuario.zipCode,
                            avatar: usuario.avatar
                        }
                        res.locals.user = req.session.user;
                        return res.redirect('/');
                    }
                })
                .catch (error => {
                    console.log(error);
                })
        }else {
            res.render('users/login.ejs', {errors: errors.errors})
        }
        // try {
        //     const usuario = await db.User.findOne({ where: { email: req.body.email.toLowerCase() } })
        //     if (!usuario) return res.redirect('/');

        //     if (bcrypt.compareSync(req.body.password, usuario.password)) {
        //         req.session.user = {
        //             id: usuario.id,
        //             username: usuario.userName,
        //             email: usuario.email,
        //             direction: usuario.address,
        //             zipcode: usuario.zipCode,
        //             avatar: usuario.avatar
        //         };
        //         res.locals.user = req.session.user;
        //         return res.redirect('/');
        //     }
        //     return res.redirect('/');
        // } catch (error) {
        //     console.log(error);
        //     return res.status(500).send({ message: 'Error al autenticar' });
        // }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/');
    }
};

module.exports = userController;