const Installation = require("../../models/services/installation-and-commission");
const cloudinary = require("../../utils/cloudinary")

exports.postInstallationImage = async (req, res) => {
  try {
    const options = {
      folder: "tranos/services",
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);

    const newInstallation = new Installation({
      installationImageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    await newInstallation.save();

    res.status(201).json({
      newInstallation,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getInstallation = async (req, res) => {
  try {
    const installationId = req.params.id;
    const installation = await Installation.findById(installationId);

    if (!installation) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      installation,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateInstallation = async (req, res) => {
  try {
    const installationId = req.params.id;
    const installation = await Installation.findById(installationId);

    if (!installation) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(installation.cloudinaryId);

    // Upload the updated banner image to Cloudinary
    const options = {
      folder: "tranos/services",
      resource_type: "auto",
    };
    const result = await cloudinary.uploader.upload(req.file.path, options);

    const updatedInstallation = await Installation.findByIdAndUpdate(
      installationId,
      {
        installationImageUrl: result.secure_url,
        cloudinaryId: result.public_id,
      },
      { new: true }
    );

    await updatedInstallation.save();

    res.status(200).json({
      msg: "successfully updated",
      updatedInstallation,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};