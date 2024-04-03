const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = require("../../middlewares/file.uplaod");

const upload = multer({ storage });

const maintenance = require("../../controllers/services/maintenance");

router.route("/").post(upload.single("imageUrl"), maintenance.postMaintenance);
router
  .route("/:id")
  .get(maintenance.getMaintenance)
  .patch(upload.single("imageUrl"), maintenance.updateMaintenance);

module.exports = router;
