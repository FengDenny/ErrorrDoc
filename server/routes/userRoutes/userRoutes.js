const express = require("express");
const userRoutes = express.Router();

const {
  getAllUsers,
  getUserInfo,
} = require("../../models/userModel/userModel");

const {
  protect,
  protected,
  updatePassword,
  updateAccount,
} = require("../../models/authModel/authModel");

userRoutes.use(protect);

userRoutes.get("/users", getAllUsers);
userRoutes.get("/account", getUserInfo);
userRoutes.patch("/account/update-password", updatePassword);
userRoutes.patch("/account/update-account", updateAccount);

module.exports = userRoutes;
