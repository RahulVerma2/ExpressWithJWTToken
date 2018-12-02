var express = require("express");
var router = express.Router();
var path = require("path");
const auth = require("../libs/auth.js");

var mongoClient = require("mongodb").MongoClient;
var db;
/* Connecting with Mongo DB */
mongoClient.connect(
  "mongodb://localhost:27017",
  (err, client) => {
    if (err) {
      console.log("error occured while retriving");
      return;
    } else {
      console.log("Connected to Mongo DB");
    }

    db = client.db("farmersowndb");
  }
);

router.post("/admin-login", auth.createToken, (req, res) => {
  console.log(req.body);
  var user = db.collection("adminLogin");
  user.find({ username: req.body.username }).toArray(function(err, docs) {
    var  userObject = docs[0];
    if (userObject) {
      console.log(userObject.password);
      if(req.body.username === userObject.password){
        res.json({
          token: res.token
        });
      }
      else{
        res.json({
          msg: "Invalid Credentials"
        });
      }
      
    }
  });
});

module.exports = router;
