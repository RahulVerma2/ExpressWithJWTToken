// =======================
// get the packages we need ============
// =======================


const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');


const profile = require('./routes/login.js');
const stocks = require('./routes/stocks.js');

// var mongoose    = require('mongoose');

// =======================

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 3000; // used to create, sign, and verify tokens
// mongoose.connect(config.database); // connect to database
// app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});


/* Used to create the api.*/
app.use('/profile', profile);
app.use('/stocks', stocks)



// =======================
// routes ================
// =======================
// basic route
// app.get('/', (req, res) => {
//    res.json({
//        message: "Welcome"
//    })
// });

// API ROUTES -------------------
// we'll get to these in a second

// =======================
// start the server ======
// =======================
app.listen(port, ()=>{
    console.log("server started");
});
