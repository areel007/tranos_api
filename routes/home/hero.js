const express = require("express");
const router = express.Router();

const hero = require("../../controllers/home/hero");

router.route('/hero').post(hero.addHeroText)
router.route('/hero/:id').get(hero.getHeroText).patch(hero.updateHeroText)

module.exports = router;