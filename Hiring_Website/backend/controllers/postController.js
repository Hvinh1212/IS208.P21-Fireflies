const Post = require("../models/postModel");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.getAll();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.getById(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPostsByEmployerId = async (req, res) => {
  const { employerId } = req.params;
  try {
    const posts = await Post.getByEmployerId(employerId);
    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: "No posts found for this employer" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
