const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const session = require('express-session')
const morgan = require('morgan')
const flash = require('connect-flash')
const MySQLStore = require('express-mysql-session')
const passport = require('passport')


const {database} = require('./keys')

//Initialize the app
const app = express()
require('./lib/passport');

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

//Middlewares

app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //Para que el servidor entienda los datos que llegan por post
app.use(express.json());

// app.use(methodOverride('_method')); //Para que el formulario pueda enviar los datos con el metodo PUT o DELETE
app.use(session({
     secret: 'mysecretapp',
     resave: false,
     saveUninitialized: false,
     store: new MySQLStore(database)
 }));

 app.use(passport.initialize());
 app.use(passport.session());
//Global Variables
app.use((req,res,next) => {
    app.locals.success = req.flash('success');
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