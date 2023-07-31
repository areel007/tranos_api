const express = require("express");
const router = express.Router();

const auth = require("../../controllers/auth/auth");

router.route("/login").post(auth.loginUser)

module.exports = router;