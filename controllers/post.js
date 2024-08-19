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

async function getPostByPath(req, res) {
  const { path } = req.params;

  try {
    const postStored = await Post.findOne({ path });
    if (postStored) {
      res.status(200).send(postStored);
    } else {
      res
        .status(404)
        .send({ msg: "Error while retrieving the post, post not found" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Server error", error });
  }
}

async function getPosts(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { createdAt: "desc" },
  };

  try {
    const postsStored = await Post.paginate({}, options);

    if (postsStored) {
      res.status(200).send(postsStored);
    } else {
      res.status(400).send({ msg: "Error while retrieving the posts" });
    }
  } catch (error) {
    res.status(400).send({ msg: "Error while retrieving the posts", error });
  }
}

async function updatePost(req, res) {
  const { id } = req.params;

  const postData = req.body;

  if (req.files.miniature) {
    const imagePath = image.getImagePath(req.files.miniature);
    postData.miniature = imagePath;
  }

  try {
    const postStored = await Post.findByIdAndUpdate({ _id: id }, postData);
    if (postStored) {
      res.status(200).send({ msg: "Post updated successfully" });
    } else {
      res.status(404).send({
        msg: "Error while updating the post, post not found",
      });
    }
  } catch (error) {
    res.status(400).send({ msg: "Error while updating the post", error });
  }
}

async function deletePost(req, res) {
  const { id } = req.params;

  try {
    const response = await Post.findByIdAndDelete({ _id: id });

    if (response) {
      res.status(200).send({ msg: "Post deleted successfully" });
    } else {
      res
        .status(404)
        .send({ msg: "Error while deleting the post, post not found" });
    }
  } catch (error) {
    res.status(400).send({ msg: "Error while deleting the post", error });
  }
}

module.exports = {
  createPost,
  getPostByPath,
  getPosts,
  updatePost,
  deletePost,
};
