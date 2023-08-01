const express = require("express");
const router = express.Router();

const caseStudies = require("../../controllers/case-studies/index");

router
  .route("/")
  .post(caseStudies.addCaseStudy)
  .get(caseStudies.getCaseStudies);

router
  .route("/:id")
  .get(caseStudies.getCaseStudy)
  .delete(caseStudies.deleteCaseStudy);

module.exports = router;
