const express = require("express");
const router = express.Router();

const banner = require("../../controllers/about/banner");

router.route("/banner").post(banner.addBanner);

router.route("/banner/:id").get(banner.getBanner).patch(banner.updateBanner);

module.exports = router;
