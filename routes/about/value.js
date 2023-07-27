const express = require("express");
const router = express.Router();

const values = require("../../controllers/about/value");

router.route("/values").post(values.addValues);

router.route("/values/:id").get(values.getValue).patch(values.updateValues)

module.exports = router;
