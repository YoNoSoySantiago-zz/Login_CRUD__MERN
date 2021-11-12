const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')

//Initialize the app
const app = express()
require('./database');

//Settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
    }));
app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({extended: false})); //Para que el servidor entienda los datos que llegan por post
app.use(methodOverride('_method')); //Para que el formulario pueda enviar los datos con el metodo PUT o DELETE
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

//Global Variables

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});