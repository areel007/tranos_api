const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/application");

// create a blog post
router
  .route("/")
  .post(applicationController.newApplication)
  .get(applicationController.getApplications);

router.route("/:id").delete(applicationController.deleteApplication);

module.exports = router;
