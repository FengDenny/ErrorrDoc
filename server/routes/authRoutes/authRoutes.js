const express = require("express");
const authRoutes = express.Router();

const { signUpFree, login } = require("../../models/authModel/authModel");

authRoutes.post("/auth/signupfree", signUpFree);
authRoutes.post("/auth/login", login);

module.exports = authRoutes;
