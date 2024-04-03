const mongoose = require("mongoose");

const fabricationSchema = new mongoose.Schema({
  fabricationImageUrl: {
    type: String,
  },
});

const Fabrication = mongoose.model("Fabrication", fabricationSchema);

module.exports = Fabrication;
