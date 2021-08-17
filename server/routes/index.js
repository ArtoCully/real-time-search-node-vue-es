const express              = require("express");
const routes               = express.Router();
const controller           = require("../controller");

routes.get("/search", controller.getCitiesByQuery);

module.exports = routes;
