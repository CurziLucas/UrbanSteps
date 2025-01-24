



const homeController = {
    index: (req, res) => {
        res.render('home.ejs', {
            titulo: 'UrbanSteps'
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
    }
}
module.exports = homeController