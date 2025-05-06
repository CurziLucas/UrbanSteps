//let {leerProductos} = require("../data/products.js")
//const path = require("path")
//const ruta = path.resolve(__dirname, "../data/products.json")
//let productos = leerProductos(ruta)
//const { agregarUsuario, leerUsuarios, buscarUsuario, editarUsuario } = require("../data/users.js")
//const rutaUsuario = path.resolve(__dirname, "../data/users.json")
//let usuarios = leerUsuarios(rutaUsuario)

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
        const sql = 'SELECT * FROM users WHERE id = ?';
        
        db.query(sql, [req.params.id], (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send({ message: 'Error al obtener el usuario' });
                return;
            }

            if (results.length === 0) {
                res.status(404).send({ message: 'Usuario no encontrado' });
                return;
            }

            const usuario = results[0];
            const usuarioEditado = {
                id: req.locals.user,
                username: req.locals.username || usuario.username,
                email: req.locals.email || usuario.email,
                direction: req.locals.direction || usuario.direction,
                zipcode: req.locals.zipcode || usuario.zipcode,
                password: req.locals.password || usuario.password,
                avatar: req.locals.avatar || usuario.avatar
            };

            const sqlUpdate = 'UPDATE users SET ? WHERE id = ?';
            db.query(sqlUpdate, [usuarioEditado, usuario.id], (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).send({ message: 'Error al actualizar el usuario' });
                } else {
                    res.redirect('/products/detalle/' + usuario.id);
                }
            });
        });
    },
    admin: (req, res) => {
        const sql = 'SELECT * FROM products';
        db.query(sql, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send({ message: 'Error al obtener productos' });
                return;
            }
            res.render('users/admin.ejs', { productos: results });
        });
    },
    addingUser: (req, res) => {
        const nuevoUsuario = {
            username: req.body.username,
            email: req.body.email.toLowerCase(),
            direction: req.body.direction,
            zipcode: req.body.zipcode,
            password: req.body.password
        };

        const sql = 'INSERT INTO users SET ?';
        db.query(sql, nuevoUsuario, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send({ message: 'Error al crear el usuario' });
            } else {
                res.redirect('/');
            }
        });
    },
    logging: (req, res) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        
        db.query(sql, [req.body.email], (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send({ message: 'Error al autenticar' });
                return;
            }

            if (results.length === 0) {
                res.redirect('/');
                return;
            }

            const usuario = results[0];
            if (req.body.password === usuario.password) {
                req.session.user = {
                    id: usuario.id,
                    username: usuario.username,
                    email: usuario.email,
                    direction: usuario.direction,
                    zipcode: usuario.zipcode,
                    avatar: usuario.avatar
                };
                res.locals.user = req.session.user;
                res.redirect('/');
            } else {
                res.redirect('/');
            }
        });
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/');
    }
};

module.exports = userController;