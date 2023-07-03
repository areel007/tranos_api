const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog must have a title"],
  },
  subtitle: {
    type: String,
  },
  content: {
    type: Object,
    required: [true, "Blog must have a detail"],
  },
  imageUrl: {
    type: String,
  },
  cloudinaryId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;