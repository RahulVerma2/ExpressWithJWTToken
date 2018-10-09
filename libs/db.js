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


  module.exports = db;