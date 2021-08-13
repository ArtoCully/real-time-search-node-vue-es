require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// use cors
app.use(cors());
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
});