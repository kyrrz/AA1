const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController");

// Ruta de login
router.post("/", loginController.login);

module.exports = router;
console.log("Login routes loaded");
