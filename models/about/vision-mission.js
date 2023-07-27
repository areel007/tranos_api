const mongoose = require("mongoose");

const visionMissionSchema = new mongoose.Schema({
  vision: {
    type: String,
  },
  mission: {
    type: String,
  },
});

const VisionMission = mongoose.model("VisionMission", visionMissionSchema);

module.exports = VisionMission;
