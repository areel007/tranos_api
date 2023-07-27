const express = require("express");
const router = express.Router();

const services = require("../../controllers/home/services");

router.route("/services").post(services.newServices);
router
  .route("/services/:id")
  .get(services.getServicesText)
  .patch(services.updateServicesText);

module.exports = router;
