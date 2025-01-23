



const homeController = {
    index: (req, res) => {
        res.render('home.ejs', {
            titulo: 'UrbanSteps'
        })
    }
}
module.exports = homeController