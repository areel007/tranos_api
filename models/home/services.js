const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  fabrication: {
    type: String,
  },
  installation: {
    type: String,
  },
  maintenance: {
    type: String,
  },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
