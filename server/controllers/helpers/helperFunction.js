const crypto = require("crypto");
exports.hashPassword = (pwd) => {
  return crypto.createHash("sha256").update(pwd).digest("base64");
};

exports.createPasswordResetToken = function (hashedToken) {
  const resetToken = crypto.randomBytes(32).toString("hex");
  hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  console.log({ resetToken }, hashedToken);
  return hashedToken;
};
