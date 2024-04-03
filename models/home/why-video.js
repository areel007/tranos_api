const mongoose = require("mongoose");

const whyVideoSchema = new mongoose.Schema({
  video: {
    type: String,
  },
});

const WhyVideo = mongoose.model("WhyVideo", whyVideoSchema);

module.exports = WhyVideo;
