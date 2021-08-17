const models = require("../models");

module.exports = {
  getCitiesByQuery,
};

async function getCitiesByQuery(req, res) {
  const query = req.query["q"];

  console.log('req.query', req.query["q"]);
  
  if (!req.query["q"]) {
    res.status(422).json({
      error: true,
      data: "Missing required parameter: text"
    });

    return;
  }

  try {
    const result = await models.getCities(req);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: "Unknown error."});
  }
}
