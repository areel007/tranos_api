const Partner = require("../../models/home/partners");
const fs = require("fs");
// const cloudinary = require("../../utils/cloudinary");

exports.addPartner = async (req, res) => {
  try {
    const newPartner = new Partner({
      partner: req.file?.path,
    });

    await newPartner.save();

    res.status(201).json({
      status: "success",
      newPartner,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getPartners = async (req, res) => {
  try {
    const partners = await Partner.find();

    res.status(200).json({
      partners,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.deletePartner = async (req, res) => {
  const partnerId = req.params.id;
  try {
    const partner = await Partner.findById(partnerId);

    if (!partner) {
      return res.status(404).json({
        error: "Partner not found",
      });
    }

    // Delete the existing image file
    fs.unlink(`${partner.partner}`, (err) => {
      if (err && err.code !== "ENOENT") {
        // Ignore file not found error
        console.error("Error deleting file:", err);
        return res.status(500).json({ message: "Error deleting file" });
      }
    });

    // Delete the image URL in mongoDB
    await Partner.findByIdAndDelete(partnerId);

    res.status(200).json({ message: "Hero image deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
