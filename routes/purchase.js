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
router.post("/todaysPurchase", (req, res) => {
  let purchase = db.collection("purchase");
  purchase.insertOne(
    {
      purchaseList: req.body.purchaseList,
      purchaseDate: req.body.purchaseDate,
      totalPurchaseCost: req.body.totalPurchaseCost,
      marketName: req.body.marketName
    },
    function(err, result) {
      if (err) {
        res.send({ msg: "Faliure" });
      } else {
        res.send({ msg: "Success" });
      }
    }
  );
});

router.post("/getPurchaseDetails", (req, res) => {
  let purchase = db.collection("purchase");
  let date = req.body.date;
  if (date) {
    let purchaseArray = [];
    if (date === "All") {
      purchase.find({}).toArray(function(err, docs) {
        

        for (let i = 0; i < docs.length; i++) {
          let obj = Object.assign({}, docs[i]);
          delete obj._id;
          purchaseArray.push(obj);
        }
        res.json({
          purchaseList: purchaseArray
        });
      });
    } else {
      purchase.find({ purchaseDate: date}).toArray(function(err, docs) {
          if(docs){
            let obj = Object.assign({}, docs[0]);
            delete obj._id;
            purchaseArray.push(obj);
            res.json({
                purchaseList: purchaseArray
              });
          }
          else{
            res.json({
                purchaseList: purchaseArray,
                msg : "Faliure: No data found."
              });
          }
          
        
      });
    
     
    }
  }
 
});

module.exports = router;
