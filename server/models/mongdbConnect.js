const { MongoClient } = require("mongodb");

const database_connect = process.env.MONGODB_ATLAS_CONNECT.replace(
  "<PASSWORD>",
  process.env.MONGODB_PASSWORD
);
const client = new MongoClient(database_connect, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbconnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (db) {
        dbconnection = db.db("errorrdoc");
        console.log(`Successfully connected to MongoDB`);
      }
      return callback();
    });
  },

  getDB: function () {
    return dbconnection;
  },
};
