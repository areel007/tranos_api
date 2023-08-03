const mongoose = require("mongoose");

const heroImageThreeSchema = new mongoose.Schema({
  heroImageThreeUrl: {
    type: String,
  },
  cloudinaryId: {
    type: String,
  },
});

const HeroImageThree = mongoose.model("HeroImageThree", heroImageThreeSchema);

module.exports = HeroImageThree;
