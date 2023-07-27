const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  banner: {
    type: String,
  },
  cloudinaryId: {
    type: String,
  },
});

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
