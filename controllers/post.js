const Post = require("../models/post");
const image = require("../utils/image");

async function createPost(req, res) {
  const post = new Post(req.body);

  post.createdAt = new Date();

  const imagePath = image.getImagePath(req.files.miniature);
  post.miniature = imagePath;

  try {
    const postStored = await post.save();
    if (postStored) {
      res.status(201).send({ msg: "Post created correctly" });
    } else {
      res.status(400).send({ msg: "Error while creating the post" });
    }
  } catch (error) {
    res.status(400).send({ msg: "Error while creating the post", error });
  }
}

module.exports = { createPost };
