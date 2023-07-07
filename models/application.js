const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Blog must have a title"],
  },
  lastname: {
    type: String,
    required: [true, "Blog must have a title"],
  },
  phone: {
    type: String,
    required: [true, "Blog must have a title"],
  },
  email: {
    type: String,
    required: [true, "Blog must have a title"],
  },
  experience: {
    type: String,
    required: [true, "Blog must have a title"],
  },
  designation: {
    type: String,
    required: [true, "Blog must have a title"],
  },
  resumeUrl: {
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

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
