const crypto = require("crypto");
exports.hashPassword = (pwd) => {
  return crypto.createHash("sha256").update(pwd).digest("base64");
};
