require("dotenv").config();
const { Client }     = require("@elastic/elasticsearch");
const elasticUrl     = process.env.ELASTIC_URL || "http://localhost:9200";
const esclient       = new Client({ node: elasticUrl });
const citiesIndex    = "cities";
const citiesType     = "cities";

async function createIndex(index) {
  try {

    await esclient.indices.create({ index });
    console.log(`Created index ${index}`);

  } catch (err) {

    console.error(`An error occurred while creating the index ${index}:`);
    console.error(err);

  }
}

function checkConnection() {
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
  citiesIndex,
  citiesType,
  elasticUrl,
  createIndex,
  checkConnection,
};
