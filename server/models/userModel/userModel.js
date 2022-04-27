const mongoClient = require("../mongdbConnect");
const db = mongoClient.db("errorrdoc");
const connection = db.collection("users");
const ObjectId = require("mongodb").ObjectId;
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, response) => {
  await connection
    .find({}, { projection: { username: 1, email: 1, updated: 1 } })
    .toArray()
    .then((result) => {
      console.log(result);
      return response.json({
        status: "success",
        message: `There are ${result.length} users total`,
        users: result,
      });
    })
    .catch((err) => {
      return response.json({ status: "fail", message: err.message });
    });
};

exports.getUserInfo = async (req, res, next) => {
  let token;
  //  check token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // retrieve the second part of the string after Bearer
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
  let user = await connection.findOne({ _id: ObjectId(decoded._id) });
  try {
    const { _id, email, username, updated } = user;
    if (!user) {
      return res.status(400).json({ error: "No document found with that ID" });
    } else if (user) {
      res.status(200).json({
        status: "success",
        user: {
          _id,
          username,
          email,
          updated,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }

  next();
};
