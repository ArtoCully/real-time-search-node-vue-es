const express    = require("express");
const routes     = express.Router();

routes.route("/search").get((req, res) => {
  res.json({ success: true, data: {} });
});

module.exports = routes;
