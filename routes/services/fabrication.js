const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = require("../../middlewares/file.uplaod");

const upload = multer({ storage });

const fabrication = require("../../controllers/services/fabrication");

router.route("/").post(upload.single("imageUrl"), fabrication.postFabrication);
router
  .route("/:id")
  .patch(upload.single("imageUrl"), fabrication.updateFabrication)
  .get(fabrication.getFabrication);

module.exports = router;
