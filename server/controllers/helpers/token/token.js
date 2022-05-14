const { promisify } = require("util");
const jwt = require("jsonwebtoken");

exports.tokenDecoder = async (req, response) => {
  let token;
  let decoded;
  try {
    if (req.headers.authorization && req.headers.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      response.json({
        status: "fail",
        message: "You are not logged in! Please log in to gain access",
      });
    } else {
      decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    }
  } catch (err) {
    console.error(err);
  }
  return { decoded, token };
};
