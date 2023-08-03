const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  maintenanceImageUrl: {
    type: String,
  },
  cloudinaryId: {
    type: String,
  },
});

const Maintenance = mongoose.model("Maintenance", maintenanceSchema);

module.exports = Maintenance;
