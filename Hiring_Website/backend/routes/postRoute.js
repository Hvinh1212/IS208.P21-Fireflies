const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

router.get("/posts", postController.getPosts);
router.get("/posts/:id", postController.getPostById);
router.get("/posts/employer/:employerId", postController.getPostsByEmployerId);

module.exports = router;
