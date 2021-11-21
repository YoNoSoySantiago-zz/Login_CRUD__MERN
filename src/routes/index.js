const express = require('express');
const router = express.Router(); //Facilita la creacion de rutas

router.get('/', (req, res) => {
    console.log('index');
    res.render('index.hbs');
});

router.get('/about', (req, res) => {
    res.render('about');
});
module.exports = router;
