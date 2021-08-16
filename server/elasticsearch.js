function checkConnection(esclient) {
  return new Promise(async (resolve) => {

    console.log("Checking connection to ElasticSearch...");

    let isConnected = false;

    while (!isConnected) {
      try {
        await esclient.cluster.health({});
        console.log("Successfully connected to ElasticSearch");
        isConnected = true;
      // eslint-disable-next-line no-empty
      } catch (error) {
        console.log("Error connecting to ElasticSearch", error);
      }
    }

    resolve(true);

  });
}

module.exports = {
  checkConnection,
};
