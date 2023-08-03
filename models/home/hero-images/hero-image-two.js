const mongoose = require("mongoose");

const heroImageTwoSchema = new mongoose.Schema({
  heroImageTwoUrl: {
    type: String,
  },
  cloudinaryId: {
    type: String,
  },
});

const HeroImageTwo = mongoose.model("HeroImageTwo", heroImageTwoSchema);

module.exports = HeroImageTwo;
