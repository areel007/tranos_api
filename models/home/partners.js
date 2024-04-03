const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  partner: {
    type: String,
  },
});

const Partner = mongoose.model("Partner", partnerSchema);

module.exports = Partner;
