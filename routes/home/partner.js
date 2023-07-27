const express = require("express");
const router = express.Router();

const partner = require("../../controllers/home/partner");

router.route("/partner").post(partner.addPartner).get(partner.getPartners);

router.route("/partner/:id").delete(partner.deletePartner);

module.exports = router;
