const express = require("express");

const router = express.Router();

const authController = require("../controller/experts_auth_controller");

router.post("/", authController.authenticate);

module.exports = router;
