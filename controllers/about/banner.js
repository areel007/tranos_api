const Banner = require("../../models/about/banner");
const cloudinary = require("../../utils/cloudinary");

exports.addBanner = async (req, res) => {
  try {
    const options = {
      folder: "tranos/about",
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);

    const newBanner = new Banner({
      banner: result.secure_url,
      cloudinaryId: result.public_id,
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
      banner
    })
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const bannerId = req.params.id;
    const banner = await Banner.findById(bannerId);

    if (!banner) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(banner.cloudinaryId);

    // Upload the updated banner image to Cloudinary
    const options = {
      folder: "tranos/about",
      resource_type: "auto",
    };
    const result = await cloudinary.uploader.upload(req.file.path, options);

    // Update the banner object with the new image URL and public ID
    banner.banner = result.secure_url;
    banner.cloudinaryId = result.public_id;

    // Save the updated banner object to the database
    await banner.save();

    res.status(200).json({
      status: "success",
      banner,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
