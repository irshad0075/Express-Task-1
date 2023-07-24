const { hash, compare } = require("bcryptjs");
const User = require("./UserSchema");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

require("dotenv").config();

// Connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("Error connecting to the database:", err));

// User sign-up controller
async function signup(req, res) {
  const { username, password, email } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Hash the password before saving to the database
    const hashedPassword = await hash(password, 10);

    // Create a new user document and save it to the database
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();

    // Generate a JWT token with the JWT_SECRET
    const token = jwt.sign(
      {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      process.env.JWT_SECRET
    );

    return res
      .status(201)
      .json({ message: "User created successfully", token });
  } catch (error) {
    console.error("Error during user sign-up:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// User login controller
async function login(req, res) {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ username });

    // Check if the user exists and compare the password
    if (!user || !(await compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token with the JWT_SECRET
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during user login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Get all users controller
async function getallusers(req, res) {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get user by email controller
async function getUserByEmail(req, res) {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const userbyEmail = async (req, res) => {
  const { email } = req.query;

  try {
    const Users = await User.findOne({ email: email });
    res.json({
      Users: Users,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports = { signup, login, getallusers, getUserByEmail, userbyEmail };
