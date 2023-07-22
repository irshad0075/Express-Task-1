// const bcrypt = require("bcrypt");
// const User = require("./UserSchema");
// const { connect } = require("mongoose");

// const signup = async (req, res) => {
//   try {
//     const { email, username, password } = req.body;

//     await connect(process.env.MONGO_URI);
//     console.log("Batabase is Connected Successfully");

//     // Check if the email or username is already taken
//     const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ error: "Email or username already exists" });
//     }

//     // Hash the password using bcrypt
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user in the database
//     const newUser = new User({ email, username, password: hashedPassword });
//     await newUser.save();

//     return res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error during signup:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

// module.exports = {
//   signup,
// };



const bcrypt = require("bcrypt");
const User = require("./UserSchema");
const { connect } = require("mongoose");


// User sign-up controller
async function signup(req, res) {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during user sign-up:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// User login controller
async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // TODO: Create a token and send it in the response for user authentication (using JWT or any other authentication mechanism)

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during user login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  signup,
  login,
};
