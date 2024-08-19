const express = require("express");
const PostController = require("../controllers/post");
const md_auth = require("../middlewares/authenticate");
const multiparty = require("connect-multiparty");

const md_upload = multiparty({ uploadDir: "./uploads/blog" });
const api = express.Router();

api.post(
  "/posts/new",
  [md_auth.assureAuth, md_upload],
  PostController.createPost
);
api.get("/posts/:path", PostController.getPostByPath);
api.get("/posts", PostController.getPosts);
api.patch(
  "/posts/:id",
  [md_auth.assureAuth, md_upload],
  PostController.updatePost
);
api.delete("/posts/:id", [md_auth.assureAuth], PostController.deletePost);

module.exports = api;
