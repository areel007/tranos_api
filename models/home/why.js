const mongoose = require("mongoose");

const whySchema = new mongoose.Schema({
  why: {
    type: String,
  },
});

const Why = mongoose.model("Why", whySchema);

module.exports = Why;
