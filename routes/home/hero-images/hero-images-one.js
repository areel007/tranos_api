const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = require("../../../middlewares/file.uplaod");

const upload = multer({ storage: storage });

const hero = require("../../../controllers/home/hero-images/hero-image-one");

router.route("/").post(upload.array("imageUrl"), hero.postHeroImage);
router
  .route("/:id")
  .get(hero.getHeroImageOne)
  .patch(upload.array("imageUrl"), hero.updateHeroImageOne);

module.exports = router;
