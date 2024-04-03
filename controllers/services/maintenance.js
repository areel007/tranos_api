const Maintenance = require("../../models/services/maintenance");
// const cloudinary = require("../../utils/cloudinary");
const fs = require("fs");

exports.postMaintenance = async (req, res) => {
  try {
    const newMaintenance = new Maintenance({
      maintenanceImageUrl: req.file.path,
    });

    await newMaintenance.save();

    res.status(201).json({
      newMaintenance,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getMaintenance = async (req, res) => {
  try {
    const maintenanceId = req.params.id;
    const maintenance = await Maintenance.findById(maintenanceId);

    if (!maintenance) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      maintenance,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateMaintenance = async (req, res) => {
  const maintenanceId = req.params.id;
  try {
    const maintenance = await Maintenance.findById(maintenanceId);

    if (!maintenance) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    // Delete the old banner file from the file system
    try {
      for (const maintenanceUrl of maintenance.maintenanceImageUrl.split(",")) {
        await fs.promises.unlink(maintenanceUrl);
      }
    } catch (err) {
      if (err.code !== "ENOENT") {
        // Ignore file not found error
        console.error("Error deleting file:", err);
        return res.status(500).json({ message: "Error deleting file" });
      }
    }

    const updatedMaintenance = await Maintenance.findByIdAndUpdate(
      maintenanceId,
      {
        maintenanceImageUrl: req.file.path,
      },
      { new: true }
    );

    await updatedMaintenance.save();

    res.status(200).json({
      msg: "successfully updated",
      updatedMaintenance: maintenance,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
