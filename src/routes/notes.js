const express = require('express');
const router = express.Router(); //Facilita la creacion de rutas

router.get('/notes', (req, res) => {
    res.send('Notes');
});

module.exports = router;