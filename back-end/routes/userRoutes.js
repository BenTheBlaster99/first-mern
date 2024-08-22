const express = require("express");
const {login , sign} = require("../controllers/userController")

const router = express.Router();
router.route("/api/users/login").post(login);
router.route("/api/users/sign").post(sign);

module.exports = router
