const express = require("express");
const router = express.Router();

const auth = require("../../controllers/auth/auth");

router.route("/register").post(auth.registerUser)

module.exports = router;