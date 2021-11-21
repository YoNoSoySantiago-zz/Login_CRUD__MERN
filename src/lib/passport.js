const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const helpers = require('../lib/helpers');
const pool = require('../database')

passport.use('local.signup', new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        passwordField: 'password2',
        passReqToCallback: true
    }, async (req, username, password, done) => {
        console.log(req.body);
        const {fullname} = req.body;
        const newUser = {
            username,
            fullname,
            password
        };
        newUser.password = await helpers.encryptPassword(password);

        const result = await pool.query('INSERT INTO users SET ?', [newUser]);
        return done(null, newUser, req.flash('success', 'User created successfully'));
    }));

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    done(null, rows[0]);
});
