require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { Client } = require("@elastic/elasticsearch");

const elasticUrl = process.env.ELASTIC_URL || "http://localhost:9200";
const esclient   = new Client({ node: elasticUrl });
const { checkConnection } = require('./elasticsearch');

// const esClient = new elasticsearch.Client({
//   hosts: [ELASTIC_URL],
//   log: "trace",
//   apiVersion:  "7.4"
// });
// // ping the client to be sure Elasticsearch is up
// esClient.ping(
//   {
//     requestTimeout: 30000,
//   },
//   function (error) {
//     // at this point, eastic search is down, please check your Elasticsearch service
//     if (error) {
//       console.trace("Elasticsearch cluster is down!", error);
//     } else {
//       console.log("Everything is ok with elasticsearch");
//     }
//   }
// );

const whitelist = [elasticUrl];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// use cors
app.use(cors(corsOptions));
// check ES connection
checkConnection(esclient);
// use the bodyparser as a middleware
app.use(bodyParser.json());
// set port for the app to listen on
app.set("port", process.env.NODE_PORT || 3001);
// set path to serve static files
app.use(express.static(path.join(__dirname, "../client/public")));
// enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// define the /search route that should return elastic search results
app.get("/search", function (req, res) {
 // Add search functionality in here
});
// listen on the specified port
app.listen(app.get("port"), function () {
  console.log("Express server listening on port " + app.get("port"));
  console.log("Elastic server url " + elasticUrl);
});