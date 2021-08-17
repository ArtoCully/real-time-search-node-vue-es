const server  = require('./');
const elastic = require('./elasticsearch');
const fs = require('fs');
const StreamArray = require( 'stream-json/streamers/StreamArray');
const fileStream = fs.createReadStream('../data/cities.json');
const jsonStream = StreamArray.withParser();

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
        fileStream,
        jsonStream,
      })
    }
  
    server.start();
  }
})();
