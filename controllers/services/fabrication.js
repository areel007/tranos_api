const Fabrication = require("../../models/services/fabrication");
// const cloudinary = require("../../utils/cloudinary");
const fs = require("fs");

exports.postFabrication = async (req, res) => {
  try {
    const newFabrication = new Fabrication({
      fabricationImageUrl: req.file.path,
    });

    await newFabrication.save();

    res.status(201).json({
      newFabrication,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getFabrication = async (req, res) => {
  const fabricationId = req.params.id;
  try {
    const fabrication = await Fabrication.findById(fabricationId);

    if (!fabrication) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      fabrication,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateFabrication = async (req, res) => {
  const fabricationId = req.params.id;
  try {
    const fabrication = await Fabrication.findById(fabricationId);

    if (!fabrication) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    // Delete the old banner file from the file system
    try {
      for (const fabricationUrl of fabrication.fabricationImageUrl.split(",")) {
        await fs.promises.unlink(fabricationUrl);
      }
    } catch (err) {
      if (err.code !== "ENOENT") {
        // Ignore file not found error
        console.error("Error deleting file:", err);
        return res.status(500).json({ message: "Error deleting file" });
      }
    }

    const updatedFabrication = await Fabrication.findByIdAndUpdate(
      fabricationId,
      {
        fabricationImageUrl: req.file.path,
      },
      { new: true }
    );

    await updatedFabrication.save();

    res.status(200).json({
      msg: "successfully updated",
      updatedFabrication,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
