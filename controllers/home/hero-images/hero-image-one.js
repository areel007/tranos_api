const HeroImage = require("../../../models/home/hero-images/hero-image-one");
const cloudinary = require("../../../utils/cloudinary");

exports.postHeroImage = async (req, res) => {
  try {
    const options = {
      folder: "tranos/home",
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);

    const newHeroImage = new HeroImage({
      heroImageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    await newHeroImage.save();

    res.status(201).json({
      newHeroImage,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
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
  try {
    const heroImageOneId = req.params.id;
    const heroImageOne = await HeroImage.findById(heroImageOneId);

    if (!heroImageOne) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(heroImageOne.cloudinaryId);

    // Upload the updated banner image to Cloudinary
    const options = {
      folder: "tranos/home",
      resource_type: "auto",
    };
    const result = await cloudinary.uploader.upload(req.file.path, options);

    // Update the banner object with the new image URL and public ID
    heroImageOne.heroImageUrl = result.secure_url;
    heroImageOne.cloudinaryId = result.public_id;

    // Save the updated banner object to the database
    await heroImageOne.save();

    res.status(200).json({
      heroImageOne,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};