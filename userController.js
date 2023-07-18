const bcrypt = require("bcrypt");
const User = require("./UserSchema");
const { connect } = require("mongoose");

const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    await connect(process.env.MONGO_URI);
    console.log("Batabase is Connected Successfully");

    // Check if the email or username is already taken
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email or username already exists" });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  signup,
};
