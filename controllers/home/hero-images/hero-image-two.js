const HeroImageTwo = require("../../../models/home/hero-images/hero-image-two");
const cloudinary = require("../../../utils/cloudinary")

exports.postHeroImageTwo = async (req, res) => {
  try {
    const options = {
      folder: "tranos/home",
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);

    const newHeroImageTwo = new HeroImageTwo({
      heroImageTwoUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    await newHeroImageTwo.save();

    res.status(201).json({
      newHeroImageTwo,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getHeroImageTwo = async (req, res) => {
  try {
    const heroImageTwoId = req.params.id;
    const heroImageTwo = await HeroImageTwo.findById(heroImageTwoId);

    if (!heroImageTwo) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      heroImageTwo,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateHeroImageTwo = async (req, res) => {
  try {
    const heroImageTwoId = req.params.id;
    const heroImageTwo = await HeroImageTwo.findById(heroImageTwoId);

    if (!heroImageTwo) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(heroImageTwo.cloudinaryId);

    // Upload the updated banner image to Cloudinary
    const options = {
      folder: "tranos/home",
      resource_type: "auto",
    };
    const result = await cloudinary.uploader.upload(req.file.path, options);

    // Update the banner object with the new image URL and public ID
    heroImageTwo.heroImageTwoUrl = result.secure_url;
    heroImageTwo.cloudinaryId = result.public_id;

    // Save the updated banner object to the database
    await heroImageTwo.save();

    res.status(200).json({
      heroImageTwo,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
