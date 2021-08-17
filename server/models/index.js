const elastic = require("../elasticsearch");

module.exports = {
  getCities,
}

async function getCities(req) {
  try {
    const { body: { hits }} = await elastic.esclient.search({
      from: req.page || 0,
      size: req.limit || 200,
      index: elastic.citiesIndex,
      type: elastic.citiesType,
      body: {
        query: {
          match: {
            name: req.query["q"]
          }
        }
      }
    });

    const results = hits.total.value;
    const values  = hits.hits.map((hit) => {
      return {
        id:     hit._id,
        country:  hit._source.country,
        name: hit._source.name,
        lat:  hit._source.lat,
        lng: hit._source.lng
      }
    });

    return {
      results,
      values,
    };
  } catch (err) {
    console.log(`Error getting cities ${JSON.stringify(err)}`);
  }
}
