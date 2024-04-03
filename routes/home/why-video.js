const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = require("../../middlewares/file.uplaod");

const upload = multer({ storage: storage });

const video = require("../../controllers/home/why-video");

router.route("/").post(upload.array("videoUrl"), video.postVideo);
router
  .route("/:id")
  .patch(upload.single("videoUrl"), video.updateVideo)
  .get(video.getVideo);

module.exports = router;
