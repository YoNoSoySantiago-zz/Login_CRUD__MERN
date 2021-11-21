import express from "express";
import morgan from "morgan";
import path from "path";
import exphbs from "express-handlebars";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import expressMySQLSession from "express-mysql-session";
import config from "./config";
import routes from "./routes";
import "./lib/passport";

//Initialize the app
const MySQLStore = expressMySQLSession(session);
const { database, port } = config;
const app = express()

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
    app.locals.warning = req.flash('warning');
    app.locals.user = req.user;
    next();
});
//Routes
app.use(routes);

//Static Files
app.use(express.static(path.join(__dirname, 'public')));


export default app;