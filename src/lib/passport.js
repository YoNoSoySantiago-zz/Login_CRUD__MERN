import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import pool from "../database.js";
import * as helpers from "./helpers.js";

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
        const existUser = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existUser.length > 0) {
            return done(null, false, req.flash('warning', 'User already exist'));
        }else{
            await pool.query('INSERT INTO users SET ?', [newUser]);
            return done(null, newUser, req.flash('success', 'User created successfully'));
        }
    }));

passport.use('local.signin', new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, username, password, done) => {
        const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        const user = rows[0];
        if (!user) {
            console.log('User not found');
            return done(null, false, req.flash('warning', 'User not found'));
            
        } else {
            const match = await helpers.matchPassword(password, user.password);
            if (match) {
                console.log('User found');
                return done(null, user, req.flash('success', 'Welcome'));
                
            } else {
                console.log('Password incorrect');
                return done(null, false, req.flash('warning', 'Password incorrect'));
                
            }
        }
    }));


passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if(rows.length > 0){
        done(null, rows[0]);
    }else{
        done(null, false);
    }
});
