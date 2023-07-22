const express = require("express");
const router = express.Router();
const userController = require("./userController");

// User sign-up
router.post("/signup", userController.signup);

// User login
router.post("/login", userController.login);

// Get all users
router.get("/getallusers", userController.getallusers);

// Get user by email
router.get("/getuserbyemail/:email", userController.getUserByEmail);

// Get user by email route using query params
router.get("/getuserbyEmail", userController.userbyEmail);

module.exports = router;
