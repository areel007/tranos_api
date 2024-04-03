const Video = require("../../models/home/why-video");
const fs = require("fs");
// const cloudinary = require("../../utils/cloudinary");

exports.postVideo = async (req, res) => {
  try {
    const newVideo = new Video({
      video: req.file?.path,
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
      video,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateVideo = async (req, res) => {
  const videoId = req.params.id;

  try {
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Delete the old video file from the file system
    try {
      for (const videoUrl of video.video.split(",")) {
        await fs.promises.unlink(videoUrl);
      }
    } catch (err) {
      if (err.code !== "ENOENT") {
        // Ignore file not found error
        console.error("Error deleting file:", err);
        return res.status(500).json({ message: "Error deleting file" });
      }
    }

    // Save the updated video file
    const newPath = req.file?.path;

    if (!newPath) {
      return res.status(400).json({ message: "No video uploaded" });
    }

    // Update the video location in MongoDB
    video.video = newPath;
    await video.save();

    res.status(200).json({ message: "Video updated successfully", video });
  } catch (error) {
    console.error("Error updating video:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
