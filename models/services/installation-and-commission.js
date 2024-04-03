const mongoose = require("mongoose");

const installationSchema = new mongoose.Schema({
  installationImageUrl: {
    type: String,
  },
});

const Installation = mongoose.model("Installation", installationSchema);

module.exports = Installation;
