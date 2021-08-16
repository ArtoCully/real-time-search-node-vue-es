require("dotenv").config();
const express        = require("express");
const app            = express();
const bodyParser     = require("body-parser");
const cors           = require("cors");
const path           = require("path");
const routes         = require('./routes');
const port           = process.env.NODE_PORT || 3001;
const { elasticUrl } = require('./elasticsearch');

function start() {

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

  return app.use(cors(corsOptions))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use("/v1", routes)
    .use((_req, res) => res.status(404).json({ success: false,error: "Route not found" }))
    .use(express.static(path.join(__dirname, "../client/public")))
    // // enable CORS
    // .use(function (req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    //     res.header(
    //       "Access-Control-Allow-Headers",
    //       "Origin, X-Requested-With, Content-Type, Accept"
    //     );
    //     next();
    // })
    .listen(port, () => {
      console.log("Express server listening on port " + port);
      console.log("Elastic server url " + elasticUrl);
    });
}

module.exports = {
  port,
  start
}