
// app.post('/profile/posts',auth.verifyToken, (req, res) => {

//     res.json({
//         message: "new Post Created...",
//         authData: res.authData
//     })
//  });

var express = require("express");
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
const auth = require('../libs/auth.js');

/* Used to load the static folder and files */
// router.use('/', express.static(__dirname + ''));

/* To set the path of the static html file to be served. */
var path = require('path');
var db;


/* Connecting with Mongo DB */
mongoClient.connect('mongodb://localhost:27017/farmersowndb', (err, database) => {
    if (err) {
        console.log('error occured while retriving');
        return;
    }
    else {
        console.log('Connected to Mongo DB');
    }

    db = database;
});


router.post('/login', auth.createToken, (req, res) => {
    console.log(req.body);
    var user = db.collection('login');
    user.find({ 'username': req.body.username }).toArray(function (err, docs) {
        var userObject = docs[0];
    });
    res.json({
        token: res.token
    })

});

router.post('/admin-login', auth.createToken, (req, res) => {
    console.log(req.body);
    var user = db.collection('login');
    user.find({ 'username': req.body.username }).toArray(function (err, docs) {
        var userObject = docs[0];
    });
    res.json({
        token: res.token
    })

});

module.exports = router;
