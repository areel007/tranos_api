const express = require("express");
const router = express.Router();

const why = require("../../controllers/home/why");

router.route("/why").post(why.postWhy)

router.route("/why/:id").get(why.getWhy).patch(why.updateWhy)


module.exports = router;
