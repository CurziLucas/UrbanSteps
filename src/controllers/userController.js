



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
        res.render('users/admin.ejs')
    }
}
module.exports = userController