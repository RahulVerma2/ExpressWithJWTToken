"use strict"
var express = require("express");
var router = express.Router();
const auth = require("../libs/auth.js");
var path = require("path");
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


// API to return the details of vegetables.
router.get("/vegetableDetail", (req, res) => {
    console.log(db);
    var vegetable = db.collection("vegetableDetail");
    vegetable.find({}).toArray(function(err, docs) {
        let vegetableArray = [];
        for(let i=0; i<docs.length; i++){
            let obj = Object.assign({}, docs[i]);
            delete obj._id;
            vegetableArray.push(obj);
        }
        res.json({
            vegetableList: vegetableArray
        });
    });
  });

module.exports = router;