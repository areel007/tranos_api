const CaseStudy = require("../../models/case-studies/index");
// const cloudinary = require("../../utils/cloudinary");
const fs = require("fs");

exports.addCaseStudy = async (req, res) => {
  let path = "";
  try {
    if (req.files) {
      const files = Array.isArray(req.files) ? req.files : [req.files];
      files.forEach((file) => {
        if (Array.isArray(file)) {
          file.forEach((singleFile) => {
            path = path + singleFile.path + ",";
          });
        } else {
          path = path + file.path + ",";
        }
      });
      path = path.substring(0, path.lastIndexOf(","));
    }
    const { title, category, project, solutionsProvided } = req.body;

    const newCaseStudy = new CaseStudy({
      title,
      category,
      project,
      solutionsProvided,
      imageUrl: path,
    });

    await newCaseStudy.save();

    res.status(201).json({
      msg: "case studies successfully added",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getCaseStudies = async (req, res) => {
  try {
    const caseStudies = await CaseStudy.find();

    res.status(200).json({
      caseStudies,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getCaseStudy = async (req, res) => {
  try {
    const caseStudyId = req.params.id;
    const caseStudy = await CaseStudy.findById(caseStudyId);

    if (!caseStudy) {
      return res.status(404).json({
        msg: "Case study not found",
      });
    }

    res.status(200).json({
      caseStudy,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.deleteCaseStudy = async (req, res) => {
  const caseStudyId = req.params.id;
  try {
    const caseStudy = await CaseStudy.findById(caseStudyId);

    if (!caseStudy) {
      return res.status(404).json({
        msg: "Case study not found",
      });
    }

    // Upload the updated image files to the file system
    for (const imageUrl of caseStudy.imageUrl.split(",")) {
      fs.unlink(imageUrl, (err) => {
        if (err && err.code !== "ENOENT") {
          // Ignore file not found error
          console.error("Error deleting file:", err);
          return res.status(500).json({ message: "Error deleting file" });
        }
      });
    }

    // Delete the case study from the database
    await CaseStudy.findByIdAndDelete(caseStudyId);

    res.status(200).json({
      msg: "Case study deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
