const express = require('express');
const router = express.Router(); //Facilita la creacion de rutas

router.get('/', (req, res) => {
    res.render('index.hbs');
});

router.get('/about', (req, res) => {
    res.render('about');
});
module.exports = router;
