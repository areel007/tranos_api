const mongoose = require("mongoose");

const caseStudiesSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  project: {
    type: String,
  },
  solutionsProvided: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

const CaseStudy = mongoose.model("CaseStudy", caseStudiesSchema);

module.exports = CaseStudy;
