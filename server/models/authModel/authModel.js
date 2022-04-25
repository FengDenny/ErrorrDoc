const dbo = require("../mongdbConnect");
const {
  hashPassword,
  createPasswordResetToken,
} = require("../../controllers/helpers/helperFunction");
// convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
const csprng = require("csprng");
const expressJWT = require("express-jwt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { promisify } = require("util");
// sending email requirements
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// email template
const {
  emailVerify,
  accountActivated,
  resetPassword,
} = require("../../views/emailTemplate/email");

exports.signUpFree = async (req, response) => {
  let { username, email, password } = req.body;
  const db_connect = dbo.getDB();
  const connection = db_connect.collection("users");
  // const accountFound = await connection.find({
  //   email: { $exists: true },
  //   username: { $exists: true },
  // });

  const userEmail = await connection.findOne({ email });
  const userPassword = await connection.findOne({ password });
  const token = jwt.sign(
    { username, email, password },
    process.env.JWT_ACCOUNT_ACTIVATION,
    { expiresIn: "2 minutes" }
  );

  if (userEmail || userPassword) {
    return response.json({
      status: "error",
      message: `${
        email ? email : username
      } is associated with another account. Please use a different ${
        email ? "email" : "username"
      }.`,
    });
  } else {
    try {
      // Will need for client later
      const url = `${process.env.CLIENT_URL}/${email}/activate/ ${token}`;
      const activateData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Account Acitivation Link",
        html: emailVerify(url),
      };

      sgMail.send(activateData).then(() => {
        return response.json({
          status: "success",
          message: `Email has been sent to ${email}. Please activate your account with that email.`,
        });
      });
    } catch (error) {
      return response.json({
        error: error.message,
      });
    }
  }
};

exports.accountActivation = async (req, response) => {
  const { token } = req.body;
  const db_connect = dbo.getDB();
  const connection = db_connect.collection("users");
  const salt = csprng(160, 36);

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      async function (err, _) {
        let { username, email, password } = jwt.decode(token);
        const activated = await connection.findOne({ email });
        password = hashPassword(`${salt}${password}`);
        const accountInfoMap = {
          username,
          email,
          password,
          salt,
        };
        if (err) {
          return response.json({
            status: "fail",
            message: "Your session has expired. Please signup again.",
          });
        }

        try {
          const url = `${process.env.CLIENT_URL}/`;
          const accountIsActivated = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Account Activated",
            html: accountActivated(url),
          };
          sgMail.send(accountIsActivated);

          if (activated) {
            return response.json({
              status: "fail",
              message: "Your account has been activated",
            });
          } else {
            await connection.insertOne(accountInfoMap, function (err, _) {
              if (err) throw error;
              response.json({
                status: "success",
                message: `${email} has successfully signed up. Please log in.`,
                user: {
                  username,
                  email,
                },
              });
            });
          }
        } catch (err) {
          return response.json({
            status: "fail",
            message: "There was a problem sending the email.",
          });
        }
      }
    );
  }
};

exports.login = async (req, response) => {
  const { email, password } = req.body;
  const db_connect = dbo.getDB();
  const connection = db_connect.collection("users");
  const accountFound = await connection.findOne({ email });

  const token = jwt.sign({ _id: accountFound._id }, process.env.JWT_SECRET, {
    expiresIn: "8 days",
  });
  // 1 Day = 24 Hrs = 24*60*60
  // 1 Day + 6  = 7 days
  response.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  const { _id, salt, username } = accountFound;
  try {
    let hashedPassword = accountFound.password;
    const passwordCheck = hashPassword(`${salt}${password}`);
    if (hashedPassword === passwordCheck) {
      response.json({
        status: "success",
        message: `Welcome back, ${username}`,
        token,
        user: {
          _id,
          username,
          email,
          token,
        },
      });
    } else {
      response.json({
        status: "error",
        message: "Your email or password was incorrect.",
      });
    }
  } catch (err) {
    return response.json({
      error: err.message,
    });
  }
};

exports.forgotPassword = async (req, response) => {
  const { email } = req.body;
  const db_connect = dbo.getDB();
  const connection = db_connect.collection("users");
  const findEmail = await connection.findOne({ email });

  if (!findEmail) {
    return response.json({
      status: "error",
      message: `There is no user associated with ${email}`,
    });
  }
  let token;
  const resetExpires = Date.now() + 10 * 60 * 1000; // 10 * 60 sec * 1000 milisec (expires in 10mins)
  const resetToken = createPasswordResetToken(token);

  try {
    await connection.updateOne(
      { email },
      {
        $set: {
          passwordResetToken: resetToken,
          passwordResetExpires: resetExpires,
        },
      }
    );
    const resetURL = `${process.env.CLIENT_URL}/auth/resetPassword/${resetToken}`;
    const resetData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Reset Password Link",
      html: resetPassword(resetURL),
    };
    sgMail.send(resetData).then(() => {
      return response.json({
        status: "success",
        message: `Email has been sent to ${email}. Follow the instructions to reset your password`,
      });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.resetPassword = async (req, response) => {
  const passReq = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  const { password } = req.body;
  const { token } = req.params;
  const db_connect = dbo.getDB();
  const connection = db_connect.collection("users");
  const userReset = await connection.findOne({
    passwordResetToken: token,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  });

  // 2) if token has not expired, and there is user, set the new password
  if (!userReset) {
    return response.json({
      status: "fail",
      message: "Token is invalid or has expired.",
    });
  }
  const { email, username, _id, salt } = userReset;
  userReset.password = password;
  userReset.passwordResetToken = undefined;
  userReset.passwordResetExpires = undefined;
  if (userReset.password.match(passReq)) {
    await connection.updateOne(
      { email },
      {
        $set: {
          password: hashPassword(`${salt}${password}`),
        },
      }
    );
    const token = jwt.sign({ _id: userReset._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    response.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });

    response.json({
      status: "success",
      message: "Your password has been reset successfully",
      token,
      user: {
        _id,
        username,
        email,
      },
    });
  } else {
    return response.json({
      status: "fail",
      message: "Invalid password format.",
    });
  }
};
