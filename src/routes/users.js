const express = require('express');
const router = express.Router(); //Facilita la creacion de rutas

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

module.exports = router;