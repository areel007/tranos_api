const mongoose = require("mongoose");

const fabricationSchema = new mongoose.Schema({
  fabricationImageUrl: {
    type: String,
  },
  cloudinaryId: {
    type: String,
  },
});

const Fabrication = mongoose.model("Fabrication", fabricationSchema);

module.exports = Fabrication;
