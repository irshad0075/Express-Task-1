const express = require("express");
const router = express.Router();
const userController = require("./userController.js");


// User sign-up route
router.post("/signup", userController.signup);

// User login route
router.post("/login", userController.login);

module.exports = router;
