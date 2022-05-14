const mongoClient = require("../mongdbConnect");
const db = mongoClient.db("errorrdoc");
const docsConnection = db.collection("documentations");
const usersConnection = db.collection("users");
const ObjectId = require("mongodb").ObjectId;
const { tokenDecoder } = require("../../controllers/helpers/token/token");

exports.createPost = async (req, response) => {
  let post;
  let user;
  const { title, description, type, tags } = req.body;

  if (!type || !tags) {
    post = {
      title,
      description,
      createdAt: new Date().toLocaleString(),
    };
  } else {
    post = {
      ...req.body,
      createdAt: new Date().toLocaleString(),
    };
  }
  await tokenDecoder(req, response)
    .then(async (decode) => {
      const { decoded } = decode;
      const { _id } = decoded;
      if (decode) {
        user = await usersConnection.findOne({
          _id: ObjectId(_id),
        });
      }
    })
    .then(async () => {
      const { _id, email, username } = user;
      const postedBy = {
        _id: ObjectId(_id),
        email,
        username,
      };
      if (user) {
        await docsConnection.insertOne(
          { post, postedBy },

          function (err, _) {
            if (err) throw err;
            response.json({
              status: "success",
              post,
              postedBy,
            });
          }
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
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
  let user;
  await tokenDecoder(req, response)
    .then(async (decode) => {
      const { decoded } = decode;
      const { _id } = decoded;
      if (decode) {
        user = await usersConnection.findOne({
          _id: ObjectId(_id),
        });
      }
    })
    .then(async () => {
      if (user) {
        const { _id } = user;
        const docs = await docsConnection
          .find({ "postedBy._id": _id })
          .toArray();
        return response.json({
          status: "success",
          message: `You have ${docs.length} ${
            docs.length > 1 ? "documentations" : "documentation"
          }`,
          result: docs,
        });
      }
    });
};
