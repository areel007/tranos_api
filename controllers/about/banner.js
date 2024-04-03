const Banner = require("../../models/about/banner");
// const cloudinary = require("../../utils/cloudinary");
const fs = require("fs");

exports.addBanner = async (req, res) => {
  try {
    const newBanner = new Banner({
      banner: req.file.path,
    });

    await newBanner.save();

    res.status(201).json({
      status: "success",
      newBanner,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getBanner = async (req, res) => {
  try {
    const bannerId = req.params.id;
    const banner = await Banner.findById(bannerId);

    if (!banner) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      banner,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateBanner = async (req, res) => {
  const bannerId = req.params.id;

  try {
    const banner = await Banner.findById(bannerId);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    // Delete the old banner file from the file system
    try {
      for (const bannerUrl of banner.banner.split(",")) {
        await fs.promises.unlink(bannerUrl);
      }
    } catch (err) {
      if (err.code !== "ENOENT") {
        // Ignore file not found error
        console.error("Error deleting file:", err);
        return res.status(500).json({ message: "Error deleting file" });
      }
    }

    // Save the updated banner file
    const newPath = req.file?.path;

    if (!newPath) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // Update the banner location in MongoDB
    banner.banner = newPath;
    await banner.save();

    res.status(200).json({ message: "Banner updated successfully", banner });
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
