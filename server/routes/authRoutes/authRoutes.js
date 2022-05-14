const express = require("express");
const authRoutes = express.Router();

const {
  signUpFree,
  accountActivation,
  login,
  forgotPassword,
  resetPassword,
  updateEmailActivation,
} = require("../../models/authModel/authModel");

const {
  userSignupValidation,
  runValidationResult,
} = require("../../controllers/helpers/expressValidator");

authRoutes.post(
  "/auth/signupfree",
  userSignupValidation,
  runValidationResult,
  signUpFree
);
authRoutes.post("/auth/account-activation", accountActivation);
// authRoutes.post("/auth/update-email-activation", updateEmailActivation);
authRoutes.post("/auth/login", login);

// @desc User ResetPassword
//@route POST "/api/v1/auth/forgotPassword"
//@route PATCH "/api/v1/auth/resetPassword/:token"
authRoutes.post("/auth/forgotPassword", forgotPassword);
authRoutes.patch("/auth/resetPassword/:token", resetPassword);

module.exports = authRoutes;
