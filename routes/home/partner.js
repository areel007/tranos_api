const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = require("../../middlewares/file.uplaod");

const upload = multer({ storage: storage });

const partner = require("../../controllers/home/partner");

router
  .route("/partner")
  .post(upload.single("partner"), partner.addPartner)
  .get(partner.getPartners);

router
  .route("/partner/:id")
  .delete(upload.single("partner"), partner.deletePartner);

module.exports = router;
