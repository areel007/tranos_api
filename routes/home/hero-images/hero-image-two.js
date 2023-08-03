const express = require("express");
const router = express.Router();

const hero = require("../../../controllers/home/hero-images/hero-image-two");

router.route("/").post(hero.postHeroImageTwo);
router.route("/:id").get(hero.getHeroImageTwo).patch(hero.updateHeroImageTwo);

module.exports = router;
