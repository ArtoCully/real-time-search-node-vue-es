const server  = require('./');
const elastic = require('./elasticsearch');

(async() => {
  const isElasticReady = await elastic.checkConnection();
  console.log('isElasticReady', isElasticReady, elastic.elasticUrl);

  if (isElasticReady) {
    server.start();
  }
})();
