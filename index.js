const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouterPromise = require("./userRouter.js"); // Updated import path

dotenv.config();

const app = express();
app.use(express.json());

// Set up MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
.then(() => {
  console.log("DB Connected");

  // Use the userRouter for all user-related routes
  userRouterPromise.then((userRouter) => {
    app.use("/api/user", userRouter.api.user);
  });

  // Start the server
  const SERVER_PORT = process.env.SERVER_PORT || 3000;
  app.listen(SERVER_PORT, () => {
    console.log(`Server is running on SERVER_PORT ${SERVER_PORT}`);
  });
})
.catch((err) => {
  console.error("MongoDB connection error:", err.message);
});
