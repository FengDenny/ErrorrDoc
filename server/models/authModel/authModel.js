const dbo = require("../mongdbConnect");

// convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

exports.signUpFree = async (req, response) => {
  let db_connect = dbo.getDB();
  const { email, password } = req.body;
  let accountInfoMap = {
    email,
    password,
  };

  await db_connect
    .collection("users")
    .insertOne(accountInfoMap, function (err, result) {
      if (err) throw err;
      response.json(result);
    });
};
