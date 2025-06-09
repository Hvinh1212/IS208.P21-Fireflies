const Post = require("../models/postModel");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.getAll();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPostsAD = async (req, res) => {
  try {
    const posts = await Post.getAllAD();
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

exports.HidePostById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Post.HideById(id);
    if (result) {
      res.status(200).json({ message: "Post hidden successfully" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.ShowPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Post.ShowById(id);
    if (result) {
      res.status(200).json({ message: "Post shown successfully" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const postData = req.body;
    const newPost = await Post.create(postData);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePostVerification = async (req, res) => {
  const { id } = req.params;
  const { is_verify } = req.body;

  try {
    const updatedPost = await Post.updateVerification(id, is_verify);
    if (updatedPost) {
      res.status(200).json({
        message: "Cập nhật trạng thái xác thực thành công",
      });
    } else {
      res.status(404).json({ message: "Không tìm thấy đơn ứng tuyển" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
