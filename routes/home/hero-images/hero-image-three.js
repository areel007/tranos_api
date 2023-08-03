const express = require("express");
const router = express.Router();

const hero = require("../../../controllers/home/hero-images/hero-image-three");

router.route("/").post(hero.postHeroImageThree);
router
  .route("/:id")
  .get(hero.getHeroImageThree)
  .patch(hero.updateHeroImageThree);

module.exports = router;
