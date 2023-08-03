const Fabrication = require("../../models/services/fabrication");
const cloudinary = require("../../utils/cloudinary");

exports.postFabrication = async (req, res) => {
  try {
    const options = {
      folder: "tranos/services",
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);

    const newFabrication = new Fabrication({
      fabricationImageUrl: result.secure_url,
      cloudinaryId: result.public_id,
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
  try {
    const fabricationId = req.params.id;
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
  try {
    const fabricationId = req.params.id;
    const fabrication = await Fabrication.findById(fabricationId);

    if (!fabrication) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(fabrication.cloudinaryId);

    // Upload the updated banner image to Cloudinary
    const options = {
      folder: "tranos/services",
      resource_type: "auto",
    };
    const result = await cloudinary.uploader.upload(req.file.path, options);

    const updatedFabrication = await Fabrication.findByIdAndUpdate(
      fabricationId,
      {
        fabricationImageUrl: result.secure_url,
        cloudinaryId: result.public_id,
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
