const HeroImageThree = require("../../../models/home/hero-images/hero-image-three");
const cloudinary = require("../../../utils/cloudinary")

exports.postHeroImageThree = async (req, res) => {
  try {
    const options = {
      folder: "tranos/home",
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);

    const newHeroImageThree = new HeroImageThree({
      heroImageThreeUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    await newHeroImageThree.save();

    res.status(201).json({
      newHeroImageThree,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getHeroImageThree = async (req, res) => {
  try {
    const heroImageThreeId = req.params.id;
    const heroImageThree = await HeroImageThree.findById(heroImageThreeId);

    if (!heroImageThree) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      heroImageThree,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateHeroImageThree = async (req, res) => {
  try {
    const heroImageThreeId = req.params.id;
    const heroImageThree = await HeroImageThree.findById(heroImageThreeId);

    if (!heroImageThree) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(heroImageThree.cloudinaryId);

    // Upload the updated banner image to Cloudinary
    const options = {
      folder: "tranos/home",
      resource_type: "auto",
    };
    const result = await cloudinary.uploader.upload(req.file.path, options);

    // Update the banner object with the new image URL and public ID
    heroImageThree.heroImageThreeUrl = result.secure_url;
    heroImageThree.cloudinaryId = result.public_id;

    // Save the updated banner object to the database
    await heroImageThree.save();

    res.status(200).json({
      heroImageThree,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
