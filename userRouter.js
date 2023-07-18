const express = require("express");
const router = express.Router();
const userController = require("./userController.js");


// Define the signup route
router.post("/signup", userController.signup);

module.exports = router;
