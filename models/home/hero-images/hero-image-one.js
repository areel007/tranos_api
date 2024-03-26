const mongoose = require("mongoose");

const heroImageSchema = new mongoose.Schema({
  heroImageUrl: {
    type: String,
  },
});

const HeroImage = mongoose.model("HeroImage", heroImageSchema);

module.exports = HeroImage;

// cloudinaryId: {
//   type: String,
// },
