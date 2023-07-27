const express = require("express");
const router = express.Router();

const visionMission = require("../../controllers/about/vision-mission");

router.route("/vision-mission").post(visionMission.createVisionMission);

router
  .route("/vision-mission/:id")
  .get(visionMission.getVisionMission)
  .patch(visionMission.updateVisionMission);

module.exports = router;
