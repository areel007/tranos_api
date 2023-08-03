const express = require("express");
const router = express.Router();

const hero = require("../../../controllers/home/hero-images/hero-image-one");

router.route("/").post(hero.postHeroImage);
router.route("/:id").get(hero.getHeroImageOne).patch(hero.updateHeroImageOne);

module.exports = router;
