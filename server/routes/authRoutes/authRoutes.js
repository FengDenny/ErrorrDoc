const express = require("express");
const authRoutes = express.Router();

const { signUpFree } = require("../../models/authModel/authModel");

// Sign Up Free Routes

authRoutes.post("/auth/signupfree", signUpFree);

module.exports = authRoutes;
