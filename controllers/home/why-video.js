const Video = require("../../models/home/why-video");
const cloudinary = require("../../utils/cloudinary");

exports.postVideo = async (req, res) => {
  try {
    const options = {
      folder: "tranos/home/videos",
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);

    const newVideo = new Video({
      video: result.secure_url,
      cloudinaryId: result.public_id,
    });

    await newVideo.save();

    res.status(201).json({
      newVideo,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      video
    })
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(video.cloudinaryId);

    // Upload the updated banner image to Cloudinary
    const options = {
      folder: "tranos/home/videos",
      resource_type: "auto",
    };
    const result = await cloudinary.uploader.upload(req.file.path, options);

    // Update the banner object with the new image URL and public ID
    video.video = result.secure_url;
    video.cloudinaryId = result.public_id;

    // Save the updated banner object to the database
    await video.save();

    res.status(200).json({
      video,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
