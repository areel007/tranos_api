const express = require("express");
const router = express.Router();

const blogPostController = require("../controllers/blog.post");

// create a blog post
router
  .route("/")
  .post(blogPostController.createBlogPost)
  .get(blogPostController.getBlogs);

router
  .route("/:id")
  .get(blogPostController.getBlog)
  .delete(blogPostController.deleteBlog);

module.exports = router;
