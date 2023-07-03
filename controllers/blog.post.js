const BlogPost = require("../models/blog.post");
const cloudinary = require("../utils/cloudinary");

exports.createBlogPost = async (req, res) => {
  try {
    const options = {
      folder: "tranos/blog",
      resource_type: "auto",
    };
    const result = await cloudinary.uploader.upload(req.file.path, options);
    const { title, subtitle, content } = req.body;

    const newBlogPost = new BlogPost({
      title,
      subtitle,
      content,
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    await newBlogPost.save();

    res.status(201).json({
      status: "success",
      newBlogPost,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await BlogPost.find();
    res.status(200).json({
      status: "success",
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogPost.findById(id);

    res.status(200).json({
      status: 'success',
      blog
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await BlogPost.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      message: "blog successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
