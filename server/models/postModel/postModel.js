const mongoClient = require("../mongdbConnect");
const db = mongoClient.db("errorrdoc");
const docsConnection = db.collection("documentations");
const usersConnection = db.collection("users");
const ObjectId = require("mongodb").ObjectId;
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

exports.createPost = async (req, response) => {
  const { title, description } = req.body;
  let token;
  //check token
  if (req.headers.authorization && req.headers.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      response.json({
        status: "fail",
        message: "You are not logged in! Please log in to gain access",
      })
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  let user = await usersConnection.findOne({ _id: ObjectId(decoded._id) });
  try {
    const { _id, email, username } = user;
    const postedBy = {
      _id: ObjectId(_id),
      email,
      username,
    };
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    } else if (user) {
      await docsConnection.insertOne(
        { title, description, postedBy },

        function (err, _) {
          if (err) throw err;
          response.json({
            status: "success",
            title,
            description,
            postedBy,
          });
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getAllPost = async (req, response) => {
  await docsConnection
    .find({})
    .toArray()
    .then((result) => {
      return response.json({
        status: "success",
        message: `There are ${result.length} documentations total.`,
        result,
      });
    })
    .catch((err) => {
      return response.json({ status: "fail", message: err.message });
    });
};

exports.getAllPostByUser = async (req, response) => {
  let token;
  //check token
  if (req.headers.authorization && req.headers.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      response.json({
        status: "fail",
        message: "You are not logged in! Please log in to gain access",
      })
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  let user = await usersConnection.findOne({ _id: ObjectId(decoded._id) });
  try {
    const { _id, username, email } = user;
    if (!user) {
      return res.status(400).json({ error: "No document found with that ID" });
    } else if (user) {
      const docs = await docsConnection.find({ "postedBy._id": _id }).toArray();
      console.log(docs);
      return response.json({
        status: "success",
        message: `${username} has ${docs.length} documentations`,
        result: docs,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
