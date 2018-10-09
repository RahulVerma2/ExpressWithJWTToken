var express = require("express");
var router = express.Router();
var db = require("../libs/db.js");
const auth = require("../libs/auth.js");

/* Used to load the static folder and files */
// router.use('/', express.static(__dirname + ''));

/* To set the path of the static html file to be served. */
var path = require("path");

router.post("/login", auth.createToken, function(req, res){
  console.log(req);
  var user = db.collection("login");
  user.find({ username: req.body.username }).toArray(function(err, docs) {
    var userObject = docs[0];
    if (userObject) {
      res.json({
        token: res.token
      });
    }
  });
});

router.post("/admin-login", auth.createToken, (req, res) => {
  console.log(req.body);
  var user = db.collection("adminLogin");
  user.find({ username: req.body.username }).toArray(function(err, docs) {
    var userObject = docs[0];
    if (userObject) {
      res.json({
        token: res.token
      });
    }
  });
});

module.exports = router;
