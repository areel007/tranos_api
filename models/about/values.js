const mongoose = require("mongoose");

const valueSchema = new mongoose.Schema({
  ourValues: {
    type: String,
  },
  canDo: {
    type: String,
  },
  proactive: {
    type: String,
  },
  surpassing: {
    type: String,
  },
  continuous: {
    type: String,
  },
  responsibility: {
    type: String,
  },
});

const Value = mongoose.model("Value", valueSchema);

module.exports = Value;
