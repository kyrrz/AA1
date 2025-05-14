const express = require("express");
const loginController = require("../controller/loginController");
const router = express.Router();

// Ruta de login
router.post("/", loginController.login);

module.exports = router;
