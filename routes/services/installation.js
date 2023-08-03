const express = require("express");
const router = express.Router();

const installation = require("../../controllers/services/installation");

router.route("/").post(installation.postInstallationImage);
router
  .route("/:id")
  .get(installation.getInstallation)
  .patch(installation.updateInstallation);

module.exports = router;
