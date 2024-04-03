const Installation = require("../../models/services/installation-and-commission");
// const cloudinary = require("../../utils/cloudinary")
const fs = require("fs");

exports.postInstallationImage = async (req, res) => {
  try {
    const newInstallation = new Installation({
      installationImageUrl: req.file.path,
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

    // Delete the old banner file from the file system
    try {
      for (const installationUrl of installation.installationImageUrl.split(
        ","
      )) {
        await fs.promises.unlink(installationUrl);
      }
    } catch (err) {
      if (err.code !== "ENOENT") {
        // Ignore file not found error
        console.error("Error deleting file:", err);
        return res.status(500).json({ message: "Error deleting file" });
      }
    }

    const updatedInstallation = await Installation.findByIdAndUpdate(
      installationId,
      {
        installationImageUrl: req.file.path,
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
