const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = require("../../middlewares/file.uplaod");
const upload = multer({ storage });

const caseStudies = require("../../controllers/case-studies/index");

router
  .route("/")
  .post(upload.array("imageUrl"), caseStudies.addCaseStudy)
  .get(caseStudies.getCaseStudies);

router
  .route("/:id")
  .get(caseStudies.getCaseStudy)
  .delete(caseStudies.deleteCaseStudy);

module.exports = router;
