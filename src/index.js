const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const morgan = require('morgan')
const { application } = require('express')

//Initialize the app
const app = express()
require('./database');

//Settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'));//__dirname es el directorio actual
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
    }));
app.set('view engine', '.hbs');
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Middlewares
app.use(morgan('dev'));
// app.use(express.urlencoded({extended: false})); //Para que el servidor entienda los datos que llegan por post
// app.use(methodOverride('_method')); //Para que el formulario pueda enviar los datos con el metodo PUT o DELETE
// app.use(session({
//     secret: 'mysecretapp',
//     resave: true,
//     saveUninitialized: true
// }));

//Global Variables
app.use((req,res,next) => {
    next();
});
//Routes
app.use(require('./routes/index'));
app.use('/links',require('./routes/links'));
app.use(require('./routes/users'));
app.use(require('./routes/authentication'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});