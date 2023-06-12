const express = require('express')
const path = require('path');
const {engine} = require('express-handlebars')
const methodOverride = require('method-override');
// Inicializaciones
const app = express()

// Configuraciones 
app.set('port',process.env.port || 3000)
app.set('views',path.join(__dirname, 'views'))
console.log();

app.engine('.hbs',engine({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'), 'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),//componentes
    extname:'.hbs'
}))
app.set('view engine','.hbs')
// Middlewares 
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

//Variables globales

//Rutas 
app.use(require('./routers/index.routes'))

//Archivos estáticos
app.use(express.static(path.join(__dirname,'public')))

// Rutas 
app.use(require('./routers/portafolio.routes'))

module.exports = app
