const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

router.get("/posts", postController.getPosts);
router.get("/postsad", postController.getPostsAD);
router.get("/posts/:id", postController.getPostById);
router.get("/posts/employer/:employerId", postController.getPostsByEmployerId);
router.put("/posts/hide/:id", postController.HidePostById);
router.put("/posts/show/:id", postController.ShowPostById);
router.put("/posts/:id/verify", postController.updatePostVerification);
router.post("/posts", postController.createPost);

module.exports = router;
