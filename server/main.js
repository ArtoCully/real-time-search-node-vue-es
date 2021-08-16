const server  = require('./');
const elastic = require('./elasticsearch');
const cities = require('./cities.json');

(async() => {
  const isElasticReady = await elastic.checkConnection();
  console.log('isElasticReady', isElasticReady, elastic.elasticUrl);

  if (isElasticReady) {

    // create cities Index
    const elasticCitiesIndex = await elastic.esclient.indices.exists({ index: elastic.citiesIndex });

    if (!elasticCitiesIndex.body) {
      await elastic.createIndex(elastic.citiesIndex);
      await elastic.setMapping({
        index: elastic.citiesIndex,
        type: elastic.citiesType,
        schema: {
          country: {
            type: "text"
          },
          name: {
            type: "text"
          },
          lat: {
            type: "text"
          },
          lng: {
            type: "text"
          },
        },
      });
      await elastic.populateEsWithData({
        index: elastic.citiesIndex,
        type: elastic.citiesType,
        data: cities,
      });
    }
  
    server.start();
  }
})();
