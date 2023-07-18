const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./userRouter.js");

dotenv.config();

const app = express();
app.use(express.json());

// Set up MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Handle connection errors
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err.message);
});

// Handle successful connection
mongoose.connection.once("open", () => {
  console.log("DB Connected");
});

// Use the userRouter for all user-related routes
app.use("/api/user", userRouter);

// Start the server
const SERVER_PORT = process.env.SERVER_PORT || 3000;
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on SERVER_PORT ${SERVER_PORT}`);
});
