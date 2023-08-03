const Maintenance = require("../../models/services/maintenance");
const cloudinary = require("../../utils/cloudinary")

exports.postMaintenance = async (req, res) => {
  try {
    const options = {
      folder: "tranos/services",
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);

    const newMaintenance = new Maintenance({
      maintenanceImageUrl: result.secure_url,
      cloudinaryId: result.public_id, // Save the public_id in the model
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
  try {
    const maintenanceId = req.params.id;
    const maintenance = await Maintenance.findById(maintenanceId);

    if (!maintenance) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(maintenance.cloudinaryId);

    // Upload the updated banner image to Cloudinary
    const options = {
      folder: "tranos/services",
      resource_type: "auto",
    };
    const result = await cloudinary.uploader.upload(req.file.path, options);

    // Update the Maintenance model with the new image URL and public ID
    maintenance.maintenanceImageUrl = result.secure_url;
    maintenance.cloudinaryId = result.public_id;

    // Save the updated Maintenance model to the database
    await maintenance.save();

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
