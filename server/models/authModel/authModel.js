const dbo = require("../mongdbConnect");
const { hashPassword } = require("../../controllers/HelperFunction");
// convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
const csprng = require("csprng");

exports.signUpFree = async (req, response) => {
  let { email, password } = req.body;
  const salt = csprng(160, 36);
  password = hashPassword(`${salt}${password}`);
  const db_connect = dbo.getDB();
  const connection = db_connect.collection("users");
  const userFound = await connection.findOne({ email });
  const accountInfoMap = {
    email,
    password,
    salt,
  };

  if (userFound) {
    return response.json({
      message: `${email} has been taken. Please use another email.`,
    });
  }

  await connection.insertOne(accountInfoMap, function (err, result) {
    if (err) throw error;
    response.json({
      status: "success",
      message: `${email} has successfully signed up. Please log in.`,
    });
  });
};

exports.login = async (req, response) => {
  const { email, password } = req.body;
  const db_connect = dbo.getDB();
  const connection = db_connect.collection("users");
  const userFound = await connection.find({ email });

  userFound.toArray((err, docs) => {
    if (err) {
      response.json({ message: err.message });
    }

    if (docs.length > 0) {
      let hashedPassword = docs[0].password;
      const salt = docs[0].salt;
      if (!password) {
        response.json({ message: "Please enter a password" });
      }
      const passwordCheck = hashPassword(`${salt}${password}`);

      if (hashedPassword === passwordCheck) {
        response.json({
          status: "success",
          message: `Welcome back, ${email}!`,
          data: {
            ...docs[0],
          },
        });
      } else {
        response.json({
          status: "error",
          message: "Your email or password was incorrect.",
        });
      }
    } else {
      response.json({
        status: "error",
        message: "There was no email associated with an account. ",
      });
    }
  });
};
