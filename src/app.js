const express = require('express')
const app = express()
const path = require('path')

app.listen(3030, () => console.log('app abierta en 3030!'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '../public')))

const routeHome = require('./routes/routeHome.js')
const routeUser = require('./routes/routeUser.js')

app.use('/', routeHome)
app.use('/user', routeUser)

app.use((req, res) => {
    res.status(404).render('error.ejs')
}) 