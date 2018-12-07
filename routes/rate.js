"use strict";
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

// API to set rate list.
router.post("/setLatestRate", auth.verifyToken,(req, res) => {
  console.log(db);
  var rate = db.collection("rateDetails");
  rate.findOneAndDelete({date: req.body.date},(err, result) => {
    if (err){
      res.send({ msg: "Faliure" });
    }else{
      rate.insertOne(
        {
          rateList: req.body.rateList,
          date: req.body.date
        },
        function(err, result) {
          if (err) {
            res.send({ msg: "Faliure" });
          } else {
            res.send({ msg: "Success" });
          }
        }
      );
    }});
 
});

// API to get rate list.
router.get("/getRateDetails",auth.verifyToken, (req, res) => {
  console.log(db);
  let d = new Date();
  let date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  var rate = db.collection("rateDetails");
  rate.find({ date: date}).toArray(function(err, docs) {
    if (docs && docs[0]) {
      let obj = Object.assign({}, docs[0]);
      delete obj._id;
      res.json({
        latestRateList: obj
      });
    } else {
      let purchase = db.collection("purchase");
      purchase.find({ purchaseDate: date }).toArray(function(err, docs) {
        if (docs && docs[0]) {
          let obj = Object.assign({}, docs[0]);
          delete obj._id;

          res.json({
            purchaseList: obj.purchaseList
          });
        } else {
          res.json({
            msg: "Faliure: No data found."
          });
        }
      });
    }
  });
});

module.exports = router;
