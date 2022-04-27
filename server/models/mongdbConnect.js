const { MongoClient } = require("mongodb");

const database_connect = process.env.MONGODB_ATLAS_CONNECT.replace(
  "<PASSWORD>",
  process.env.MONGODB_PASSWORD
);
const mongoClient = new MongoClient(database_connect, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoClient.connect((err) => {
  console.log("Connected to MongoDB!");
});

module.exports = mongoClient;
