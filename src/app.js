const express = require('express')
const session = require('express-session')
const app = express()
const path = require('path')
const localsUserCheck = require('./middlewares/localsUserCheck.js')

app.listen(3030, () => console.log('app abierta en 3030!'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({secret:'secret'}))
app.use(localsUserCheck)

const routeHome = require('./routes/routeHome.js')
const routeUser = require('./routes/routeUser.js')
const routeProducts = require('./routes/routeProducts.js')

app.use('/', routeHome)
app.use('/user', routeUser)
app.use('/products', routeProducts)

app.use((req, res) => {
    res.status(404).render('error.ejs')
}) 