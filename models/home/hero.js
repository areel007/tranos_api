const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  lightTextOne: {
    type: String,
  },
  lightTextTwo: {
    type: String,
  },
  boldText: {
    type: String,
  },
  smallText: {
    type: String,
  },
});

const Hero = mongoose.model("Hero", heroSchema);

module.exports = Hero;
