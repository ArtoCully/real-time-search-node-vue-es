require("dotenv").config();
const { Client }     = require("@elastic/elasticsearch");
const elasticUrl     = process.env.ELASTIC_URL || "http://localhost:9200";
const esclient       = new Client({ node: elasticUrl });
const citiesIndex    = "cities";
const citiesType     = "cities_list";

async function createIndex(index) {
  try {

    await esclient.indices.create({ index });
    console.log(`Created index ${index}`);

  } catch (err) {

    console.error(`An error occurred while creating the index ${index}:`);
    console.error(err);

  }
}

async function setMapping ({
  schema,
  index,
  type
}) {
  try {
    await esclient.indices.putMapping({ 
      index,
      type,
      include_type_name: true,
      body: {
        properties: schema
      }
    });

    console.log(`${index} mapping created successfully`);

  } catch (err) {
    console.error(`An error occurred while setting the ${index} mapping:`);
    console.error(err);
  }
}

async function populateEsWithData({ index, type, fileStream, jsonStream }) {
  const esAction = {
    index: {
      _index: index,
      _type: type
    }
  };

  const docs = [];

  try {
    fileStream.pipe(jsonStream.input);

    jsonStream.on('data', ({key, value}) => {
      console.log(key, value);
      docs.push(esAction);
      docs.push(value);
    });

    jsonStream.on('end', () => {
      console.log('Successfully streamed data');
      esclient.bulk({ body: docs });
    });
  } catch (err) {
    console.error('An error occured while populating ES Data', err);
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
  esclient,
  elasticUrl,
  createIndex,
  checkConnection,
  setMapping,
  populateEsWithData,
};
