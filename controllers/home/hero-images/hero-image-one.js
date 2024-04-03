const HeroImage = require("../../../models/home/hero-images/hero-image-one");
// const cloudinary = require("../../../utils/cloudinary");
const fs = require("fs");

exports.postHeroImage = async (req, res) => {
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

    const heroImageUrl = path;

    const news = new HeroImage({
      heroImageUrl,
    });

    await news.save();
    res.status(201).json({ message: "Hero image successfully added" });
  } catch (error) {
    console.error("Error adding news and events:", error);
    res.status(500).json({ message: "Error adding news and events" });
  }
};

exports.getHeroImageOne = async (req, res) => {
  try {
    const heroImageOneId = req.params.id;
    const heroImageOne = await HeroImage.findById(heroImageOneId);

    if (!heroImageOne) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      heroImageOne,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateHeroImageOne = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the hero image document by ID
    const heroImg = await HeroImage.findById(id);

    if (!heroImg) {
      return res.status(404).json({ message: "Hero image not found" });
    }

    // Delete the existing image files from the file system
    for (const imageUrl of heroImg.heroImageUrl.split(",")) {
      fs.unlink(imageUrl, (err) => {
        if (err && err.code !== "ENOENT") {
          // Ignore file not found error
          console.error("Error deleting file:", err);
          return res.status(500).json({ message: "Error deleting file" });
        }
      });
    }

    // Upload the updated image files to the file system
    let paths = "";
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        paths += file.path + ",";
      }
      paths = paths.slice(0, -1); // Remove the trailing comma
    }

    if (!paths) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // Update the image locations in MongoDB
    heroImg.heroImageUrl = paths;
    await heroImg.save();

    res.status(200).json({ message: "Hero images updated successfully" });
  } catch (error) {
    console.error("Error updating hero image:", error);
    res.status(500).json({ message: "Error updating hero image" });
  }
};
