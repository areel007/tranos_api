const express = require("express");
const router = express.Router();

const maintenance = require("../../controllers/services/maintenance");

router.route("/").post(maintenance.postMaintenance);
router
  .route("/:id")
  .get(maintenance.getMaintenance)
  .patch(maintenance.updateMaintenance);

module.exports = router;
