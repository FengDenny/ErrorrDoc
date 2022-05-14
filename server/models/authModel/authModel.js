const mongoClient = require("../mongdbConnect");
const db = mongoClient.db("errorrdoc");
const connection = db.collection("users");
const {
  hashPassword,
  createPasswordResetToken,
} = require("../../controllers/helpers/helperFunction");
// convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
const csprng = require("csprng");
const { expressjwt: jwtoken } = require("express-jwt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const salt = csprng(160, 36);
const { tokenDecoder } = require("../../controllers/helpers/token/token");
// sending email requirements
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// email template
const {
  emailVerify,
  accountActivated,
  emailReVerify,
  resetPassword,
  emailReActivated,
} = require("../../views/emailTemplate/email");

exports.signUpFree = async (req, response) => {
  let { username, email, password } = req.body;
  // const accountFound = await connection.find({
  //   email: { $exists: true },
  //   username: { $exists: true },
  // });

  const userEmail = await connection.findOne({ email });
  const userUsername = await connection.findOne({ username });
  const token = jwt.sign(
    { username, email, password },
    process.env.JWT_ACCOUNT_ACTIVATION,
    { expiresIn: "2 minutes" }
  );

  if (userEmail || userUsername) {
    return response.json({
      status: "error",
      message: `${
        userEmail ? email : username
      } is already taken. Please use a different ${
        userEmail ? "email" : "username"
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
  const accountFound = await connection.findOne({ email });

  if (!accountFound) {
    return response.json({
      status: "error",
      message: `${email} has not been signed up yet. Please sign up.`,
    });
  }

  const { _id, salt, username } = accountFound;
  try {
    let hashedPassword = accountFound.password;
    const passwordCheck = hashPassword(`${salt}${password}`);
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
  const user = await connection.findOne({ email });
  const { username } = user;
  if (!user) {
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
      { username },
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
  const { password, confirmPassword } = req.body;
  const { token } = req.params;
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
  const { email, username, _id } = userReset;
  userReset.password = password;
  if (
    userReset.password.match(passReq) &&
    confirmPassword.match(userReset.password)
  ) {
    await connection.updateOne(
      { username },
      {
        $set: {
          password: hashPassword(`${salt}${password}`),
          salt: salt,
          passwordResetToken: undefined,
          passwordResetExpires: undefined,
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
  } else if (!confirmPassword.match(userReset.password)) {
    return response.json({
      status: "fail",
      message: "Password does not match.",
    });
  } else {
    return response.json({
      status: "fail",
      message: [
        {
          title: "Password must be",
          requirement_1: "6 to 20 characters",
          requirement_2: "one numeric digit",
          requirement_3: "one uppercase letter",
          requirement_4: "one lowercase letter",
        },
      ],
    });
  }
};

// protect account  middleware
exports.protect = async (req, response, next) => {
  let currentUser;
  currentUser &&
    tokenDecoder(req, response).then((decode) => {
      if (currentUser) {
        currentUser = connection.find({ _id: ObjectId(decode._id) });
      }
    });
  req.user = currentUser;
  response.locals.user = currentUser;
  next();
};

exports.protected = jwtoken({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

// Update account

exports.updatePassword = async (req, response) => {
  const { password, currentPassword } = req.body;
  let user;
  await tokenDecoder(req, response)
    .then(async (decode) => {
      user = await connection.findOne({ _id: ObjectId(decode._id) });
    })
    .then(async () => {
      const { salt, username } = user;
      const confirmPassCheck = hashPassword(`${salt}${currentPassword}`);
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      if (!password || !currentPassword) {
        return response.json({
          status: "fail",
          message: `Enter a password and a current password.`,
        });
      }
      if (user.password !== confirmPassCheck) {
        return response.json({
          status: "fail",
          message: "Your current password is incorrect.",
        });
      } else {
        user.password = password;
        await connection.updateOne(
          { username },
          {
            $set: {
              password: hashPassword(`${salt}${password}`),
              updated: new Date().toLocaleString(),
            },
          }
        );
        return response.json({
          status: "success",
          message: "Your password has been updated.",
          token,
          updated: new Date().toLocaleString(),
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateAccount = async (req, response) => {
  let user;
  const { email, username } = req.body;
  let token;
  await tokenDecoder(req, response)
    .then(async (decode) => {
      const { decoded } = decode;
      token = jwt.sign(
        { username, email, _id: decoded._id },
        process.env.JWT_ACCOUNT_ACTIVATION,
        { expiresIn: "2 minutes" }
      );
      user = await connection.findOne({ _id: ObjectId(decoded._id) });
    })
    .then(async () => {
      const { _id } = user;
      const userEmail = await connection.findOne({ email });
      const userUsername = await connection.findOne({ username });

      if (userEmail || userUsername) {
        return response.json({
          status: "error",
          message: `${
            userEmail ? email : username
          } is associated with another account. Please use a different ${
            userEmail ? "email" : "username"
          }.`,
        });
      }
      if (username) {
        await connection.updateOne(
          { _id },
          {
            $set: {
              username,
              updated: new Date().toLocaleString(),
            },
          }
        );
      }
      if (email) {
        // Will need for client later
        const url = `${process.env.CLIENT_URL}/${email}/activate/ ${token}`;
        const activateData = {
          from: process.env.EMAIL_FROM,
          to: email,
          subject: "Account Acitivation Link",
          html: emailReVerify(url),
        };

        sgMail
          .send(activateData)
          .then(() => {
            response.json({
              status: "success",
              message: `Email has been sent to ${email}. Please activate your account with that email.`,
            });
          })
          .then(() => {
            connection.updateOne(
              { _id },
              {
                $set: {
                  email,
                  updated: new Date().toLocaleString(),
                },
              }
            );
          });
      } else {
        const tokenSign = jwt.sign({ _id: _id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        return response.json({
          status: "success",
          message: `Account has been updated successfully.`,
          user: {
            _id,
            username,
            email,
            token: tokenSign,
            updated: new Date().toLocaleString(),
          },
        });
      }
    });
};

// exports.updateEmailActivation = async (req, response) => {
//   const { token } = req.body;
//   if (token) {
//     jwt.verify(
//       token,
//       process.env.JWT_ACCOUNT_ACTIVATION,
//       async function (err, _) {
//         let { email, _id } = jwt.decode(token);
//         const activated = await connection.findOne({ email });
//         if (err) {
//           console.log(err);
//         }

//         try {
//           const url = `${process.env.CLIENT_URL}/`;
//           const accountIsActivated = {
//             from: process.env.EMAIL_FROM,
//             to: email,
//             subject: "Account Activated",
//             html: accountActivated(url),
//           };
//           sgMail.send(accountIsActivated);

//           if (activated) {
//             return response.json({
//               status: "fail",
//               message: "Your account has been activated",
//             });
//           } else {
//             await connection.updateOne(
//               { _id },
//               {
//                 $set: {
//                   email,
//                   updated: new Date().toLocaleString(),
//                 },
//               }
//             );
//           }
//         } catch (err) {
//           return response.json({
//             status: "fail",
//             message: "There was a problem sending the email.",
//           });
//         }
//       }
//     );
//   }
// };
