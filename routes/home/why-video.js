const express = require("express");
const router = express.Router();

const video = require("../../controllers/home/why-video");

router.route("/").post(video.postVideo);
router.route("/:id").patch(video.updateVideo).get(video.getVideo);

module.exports = router;
