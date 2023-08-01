const CaseStudy = require("../../models/case-studies/index");
const cloudinary = require("../../utils/cloudinary")

exports.addCaseStudy = async (req, res) => {
  try {
    const options = {
      folder: "tranos/case-studies",
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);
    const {title, category, project, solutionsProvided} = req.body;

    const newCaseStudy = new CaseStudy({
      title,
      category,
      project,
      solutionsProvided,
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    })

    await newCaseStudy.save()

    res.status(201).json({
      msg: "case studies successfully added"
    })
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
  try {
    const caseStudyId = req.params.id;
    
    const caseStudy = await CaseStudy.findById(caseStudyId);

    if (!caseStudy) {
      return res.status(404).json({
        msg: "Case study not found",
      });
    }

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(caseStudy.cloudinaryId);

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


