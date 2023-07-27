const Partner = require("../../models/home/partners");
const cloudinary = require("../../utils/cloudinary");

exports.addPartner = async (req, res) => {
  try {
    const options = {
      folder: "tranos/home",
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);

    const newPartner = new Partner({
      partner: result.secure_url,
      cloudinaryId: result.public_id,
    });

    await newPartner.save();

    res.status(201).json({
      status: "success",
      newPartner,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getPartners = async (req, res) => {
  try {
    const partners = await Partner.find();

    res.status(200).json({
      partners,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.deletePartner = async (req, res) => {
  try {
    const partnerId = req.params.id; 

    const partner = await Partner.findById(partnerId);

    if (!partner) {
      return res.status(404).json({
        error: "Partner not found",
      });
    }

    await cloudinary.uploader.destroy(partner.cloudinaryId);

    await Partner.findByIdAndDelete(partnerId);

    res.status(200).json({
      status: "success",
      message: "Partner deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

