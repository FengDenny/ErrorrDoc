const express = require("express");
const postRoutes = express.Router();
const {
  createPost,
  getAllPost,
  getAllPostByUser,
} = require("../../models/postModel/postModel");
const { protect } = require("../../models/authModel/authModel");

postRoutes.use(protect);
postRoutes.get("/get-all", getAllPost);
postRoutes.get("/get-post", getAllPostByUser);
postRoutes.post("/create-post", createPost);
module.exports = postRoutes;
