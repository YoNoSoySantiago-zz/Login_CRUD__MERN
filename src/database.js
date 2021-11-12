const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/login_crud', function (err,db) {
    if (err) {
        console.log('Error connecting to MongoDB database. ' + err);
    } else {
        console.log('Connected to MongoDB database.');
    }
});