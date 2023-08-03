const express = require("express");
const router = express.Router();

const fabrication = require("../../controllers/services/fabrication");

router.route("/").post(fabrication.postFabrication);
router
  .route("/:id")
  .patch(fabrication.updateFabrication)
  .get(fabrication.getFabrication);

module.exports = router;
